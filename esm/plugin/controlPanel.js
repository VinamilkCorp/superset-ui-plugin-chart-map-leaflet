/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import { t } from '@superset-ui/core';
import { ColumnOption } from '@superset-ui/chart-controls';
import { jsx as ___EmotionJSX } from "@emotion/react";
export let QueryMode;

(function (QueryMode) {
  QueryMode["aggregate"] = "aggregate";
  QueryMode["raw"] = "raw";
})(QueryMode || (QueryMode = {}));

const QueryModeLabel = {
  [QueryMode.aggregate]: t('Aggregate'),
  [QueryMode.raw]: t('Raw Records')
};

function getQueryMode(controls) {
  var _controls$query_mode, _controls$all_columns;

  const mode = controls == null ? void 0 : (_controls$query_mode = controls.query_mode) == null ? void 0 : _controls$query_mode.value;

  if (mode === QueryMode.aggregate || mode === QueryMode.raw) {
    return mode;
  }

  const rawColumns = controls == null ? void 0 : (_controls$all_columns = controls.all_columns) == null ? void 0 : _controls$all_columns.value;
  const hasRawColumns = rawColumns && rawColumns.length > 0;
  return hasRawColumns ? QueryMode.raw : QueryMode.aggregate;
}
/**
 * Visibility check
 */


function isQueryMode(mode) {
  return ({
    controls
  }) => getQueryMode(controls) === mode;
}

const isAggMode = isQueryMode(QueryMode.aggregate);
const isRawMode = isQueryMode(QueryMode.raw);
const queryMode = {
  type: 'RadioButtonControl',
  label: t('Query mode'),
  default: null,
  options: [[QueryMode.aggregate, QueryModeLabel[QueryMode.aggregate]], [QueryMode.raw, QueryModeLabel[QueryMode.raw]]],
  mapStateToProps: ({
    controls
  }) => ({
    value: getQueryMode(controls)
  })
};
const all_columns = {
  type: 'SelectControl',
  label: t('Columns'),
  description: t('Columns to display'),
  multi: true,
  freeForm: true,
  allowAll: true,
  commaChoosesOption: false,
  default: [],
  optionRenderer: c => ___EmotionJSX(ColumnOption, {
    showType: true,
    column: c
  }),
  valueRenderer: c => ___EmotionJSX(ColumnOption, {
    column: c
  }),
  valueKey: 'column_name',
  mapStateToProps: ({
    datasource,
    controls
  }) => ({
    options: (datasource == null ? void 0 : datasource.columns) || [],
    queryMode: getQueryMode(controls)
  }),
  visibility: isRawMode
};
const config = {
  controlPanelSections: [{
    label: t('Query'),
    expanded: true,
    controlSetRows: [[{
      name: 'query_mode',
      config: queryMode
    }], [{
      name: 'groupby',
      override: {
        visibility: isAggMode
      }
    }], [{
      name: 'metrics',
      override: {
        // validators: [],
        visibility: isAggMode
      }
    }, {
      name: 'all_columns',
      config: all_columns
    }], ['adhoc_filters'], ['row_limit']]
  }],
  controlOverrides: {
    row_limit: {
      default: 1000
    }
  }
};
export default config;