{"source":"webpackJsonp([24],{1094:function(t,e,s){var l=s(76)(s(1138),s(1211),null,null);l.options.__file=\"C:\\\\Users\\\\Administrator\\\\Desktop\\\\Vue\\\\uche\\\\src\\\\views\\\\my_components\\\\associatedVehicle\\\\assVehicleDetails.vue\",l.esModule&&Object.keys(l.esModule).some(function(t){return\"default\"!==t&&\"__esModule\"!==t}),l.options.functional,t.exports=l.exports},1138:function(t,e,s){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var l=s(420);e.default={props:[\"windowOutHeight\"],data:function(){return{tabPosition:\"left\",listData:[],total:0,pageSize:15,currentPage:1,listLoading:!1,vehThisList:[],getParams:[]}},methods:{changeTab:function(t){0==t?this.handleDetails():1==t&&this.handleQuery()},handleDetails:function(){var t=this,e={vehicleid:this.getParams.row.vehicleid};(0,l.getAssVeh)(e).then(function(e){t.vehThisList=e.data.data.records[0]})},handleQuery:function(){var t=this,e={currentPage:this.currentPage,showCount:this.pageSize};this.listLoading=!0,(0,l.getAssVeh)(e).then(function(e){t.total=e.data.data.totalResult,t.listData=e.data.data.records,t.listLoading=!1})},handleCurrentChange:function(t){this.currentPage=t,this.handleQuery()},handleSizeChange:function(t){this.pageSize=t,this.handleQuery()},dateFormatter:function(t,e){if(\"\"!=t.createdate&&void 0!=t.createdate)return util.formatDate.format(new Date(t.createdate),\"yyyy-MM-dd\")},dateFormatterSecond:function(t,e){if(\"\"!=t.updatedate&&void 0!=t.updatedate)return util.formatDate.format(new Date(t.updatedate),\"yyyy-MM-dd\")},genderFormatter:function(t,e){return\"M\"==t.gender?\"男\":\"F\"==t.gender?\"女\":\"暂无\"}},mounted:function(){this.getParams=this.$route.params,this.handleDetails()}}},1211:function(t,e,s){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s(\"el-tabs\",{staticClass:\"leftTabs\",attrs:{\"tab-position\":t.tabPosition},on:{\"tab-click\":t.changeTab}},[s(\"el-tab-pane\",[s(\"span\",{attrs:{slot:\"label\"},slot:\"label\"},[s(\"i\",{staticClass:\"el-icon-document\"}),t._v(\" 车辆详情\")]),t._v(\" \"),s(\"el-row\",{staticClass:\"tabsone_content\"},[s(\"el-col\",{attrs:{span:24}},[s(\"span\",{staticClass:\"formTile\"},[t._v(\"车主信息\")])]),t._v(\" \"),s(\"el-col\",{attrs:{span:6}},[s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"车主：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.name))])]),t._v(\" \"),s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"出生日期：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.mobile))])]),t._v(\" \"),s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"邮箱：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.mobile))])]),t._v(\" \"),s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"车主状态：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.mobile))])])]),t._v(\" \"),s(\"el-col\",{attrs:{span:6}},[s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"联系方式：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.mobile))])]),t._v(\" \"),s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"职业：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.mobile))])]),t._v(\" \"),s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"宗教：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.mobile))])]),t._v(\" \"),s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"车主来源：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.mobile))])])]),t._v(\" \"),s(\"el-col\",{attrs:{span:6}},[s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"性别：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(\"M\"==t.vehThisList.gender?\"男\":\"F\"==t.vehThisList.gender?\"女\":\"暂无\"))])]),t._v(\" \"),s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"负责人：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.mobile))])]),t._v(\" \"),s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"年收入(元)：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.mobile))])]),t._v(\" \"),s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"车主等级：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.mobile))])])]),t._v(\" \"),s(\"el-col\",{attrs:{span:6}},[s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"年龄：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.age))])]),t._v(\" \"),s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"车主类型：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.mobile))])]),t._v(\" \"),s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"关注状态：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.mobile))])]),t._v(\" \"),s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"车主分类：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.mobile))])])])],1),t._v(\" \"),s(\"el-row\",{staticClass:\"tabsone_content\"},[s(\"el-col\",{attrs:{span:24}},[s(\"span\",{staticClass:\"formTile\"},[t._v(\"关联车辆信息\")])]),t._v(\" \"),s(\"el-col\",{attrs:{span:6}},[s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"车辆：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.name))])]),t._v(\" \"),s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"车牌号：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.name))])])]),t._v(\" \"),s(\"el-col\",{attrs:{span:6}},[s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"车架号：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.mobile))])]),t._v(\" \"),s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"颜色：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.mobile))])])]),t._v(\" \"),s(\"el-col\",{attrs:{span:6}},[s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"车型：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.mobile))])]),t._v(\" \"),s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"发动机号：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.mobile))])])]),t._v(\" \"),s(\"el-col\",{attrs:{span:6}},[s(\"dl\",{staticClass:\"dllist\"},[s(\"dt\",[t._v(\"车价(万)：\")]),t._v(\" \"),s(\"dd\",[t._v(t._s(t.vehThisList.age))])])])],1)],1),t._v(\" \"),s(\"el-tab-pane\",[s(\"span\",{attrs:{slot:\"label\"},slot:\"label\"},[s(\"i\",{staticClass:\"el-icon-service\"}),t._v(\" 操作详情\")]),t._v(\" \"),s(\"el-table\",{directives:[{name:\"loading\",rawName:\"v-loading\",value:t.listLoading,expression:\"listLoading\"}],attrs:{\"max-height\":t.windowOutHeight-260,border:\"\",data:t.listData,\"highlight-current-row\":\"\",\"element-loading-text\":\"拼命加载中\",\"element-loading-spinner\":\"el-icon-loading\"}},[s(\"el-table-column\",{attrs:{type:\"index\",label:\"\",width:\"40\",align:\"center\"}}),t._v(\" \"),s(\"el-table-column\",{attrs:{prop:\"\",label:\"关联人头像\",align:\"center\"}}),t._v(\" \"),s(\"el-table-column\",{attrs:{prop:\"\",label:\"关联人昵称\",align:\"center\"}}),t._v(\" \"),s(\"el-table-column\",{attrs:{prop:\"\",label:\"关联人姓名\",align:\"center\"}}),t._v(\" \"),s(\"el-table-column\",{attrs:{prop:\"\",label:\"关联人手机号\",align:\"center\"}}),t._v(\" \"),s(\"el-table-column\",{attrs:{prop:\"\",label:\"与车主关系\",align:\"center\"}}),t._v(\" \"),s(\"el-table-column\",{attrs:{prop:\"\",label:\"关联来源\",align:\"center\"}}),t._v(\" \"),s(\"el-table-column\",{attrs:{prop:\"\",label:\"操作人\",align:\"center\"}}),t._v(\" \"),s(\"el-table-column\",{attrs:{prop:\"\",label:\"操作内容\",align:\"center\"}}),t._v(\" \"),s(\"el-table-column\",{attrs:{prop:\"\",label:\"操作时间\",align:\"center\"}})],1),t._v(\" \"),s(\"el-pagination\",{staticStyle:{\"text-align\":\"right\",\"margin-top\":\"5px\"},attrs:{\"page-sizes\":[15,50,80,99],\"page-size\":t.pageSize,layout:\"total, sizes, prev, pager, next, jumper\",total:t.total},on:{\"size-change\":t.handleSizeChange,\"current-change\":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]},t.exports.render._withStripped=!0}});"}