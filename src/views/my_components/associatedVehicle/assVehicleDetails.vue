<template>
    <el-tabs :tab-position="tabPosition" @tab-click="changeTab" class="leftTabs">
        <el-tab-pane>
        	<span slot="label"><i class="el-icon-document"></i> 车辆详情</span>
                 	<el-row class="tabsone_content">
                 		<el-col :span="24">
	                            <span class="formTile">车主信息</span>
	                        </el-col>
	                        <el-col :span="6">
		                         <dl class="dllist">
		                              <dt>车主：</dt>
		                              <dd>{{ vehThisList.name }}</dd>
		                         </dl>
		                         <dl class="dllist">
		                               <dt>出生日期：</dt>
		                               <dd>{{ vehThisList.mobile }}</dd>
		                         </dl>
		                         <dl class="dllist">
		                               <dt>邮箱：</dt>
		                               <dd>{{ vehThisList.mobile }}</dd>
		                         </dl>
		                         <dl class="dllist">
		                               <dt>车主状态：</dt>
		                               <dd>{{ vehThisList.mobile }}</dd>
		                         </dl>
	                         </el-col>
	                         <el-col :span="6">
	                         	<dl class="dllist">
		                               <dt>联系方式：</dt>
		                               <dd>{{ vehThisList.mobile }}</dd>
		                         </dl>
		                         <dl class="dllist">
		                               <dt>职业：</dt>
		                               <dd>{{ vehThisList.mobile }}</dd>
		                         </dl>
		                         <dl class="dllist">
		                               <dt>宗教：</dt>
		                               <dd>{{ vehThisList.mobile }}</dd>
		                         </dl>
		                         <dl class="dllist">
		                               <dt>车主来源：</dt>
		                               <dd>{{ vehThisList.mobile }}</dd>
		                         </dl>
	                         </el-col>
	                         <el-col :span="6">
	                         	<dl class="dllist">
		                               <dt>性别：</dt>
		                               <dd>{{ vehThisList.gender == 'M' ? '男' : vehThisList.gender == 'F' ? '女' : '暂无' }}</dd>
		                         </dl>
	                            	<dl class="dllist">
		                               <dt>负责人：</dt>
		                               <dd>{{ vehThisList.mobile }}</dd>
		                         </dl>
		                         <dl class="dllist">
		                               <dt>年收入(元)：</dt>
		                               <dd>{{ vehThisList.mobile }}</dd>
		                         </dl>
		                         <dl class="dllist">
		                               <dt>车主等级：</dt>
		                               <dd>{{ vehThisList.mobile }}</dd>
		                         </dl>
	                         </el-col>
	                         <el-col :span="6">
	                         	<dl class="dllist">
		                               <dt>年龄：</dt>
		                               <dd>{{ vehThisList.age }}</dd>
		                         </dl>
		                         <dl class="dllist">
		                               <dt>车主类型：</dt>
		                               <dd>{{ vehThisList.mobile }}</dd>
		                         </dl>
		                         <dl class="dllist">
		                               <dt>关注状态：</dt>
		                               <dd>{{ vehThisList.mobile }}</dd>
		                         </dl>
		                         <dl class="dllist">
		                               <dt>车主分类：</dt>
		                               <dd>{{ vehThisList.mobile }}</dd>
		                         </dl>
	                         </el-col>
                         </el-row>
                         <el-row class="tabsone_content">
                 		<el-col :span="24">
	                            <span class="formTile">关联车辆信息</span>
	                        </el-col>
	                        <el-col :span="6">
	                        		<dl class="dllist">
		                              <dt>车辆：</dt>
		                              <dd>{{ vehThisList.name }}</dd>
		                         </dl>
		                         <dl class="dllist">
		                              <dt>车牌号：</dt>
		                              <dd>{{ vehThisList.name }}</dd>
		                         </dl>
	                         </el-col>
	                         <el-col :span="6">
	                         	<dl class="dllist">
		                               <dt>车架号：</dt>
		                               <dd>{{ vehThisList.mobile }}</dd>
		                         </dl>
		                         <dl class="dllist">
		                               <dt>颜色：</dt>
		                               <dd>{{ vehThisList.mobile }}</dd>
		                         </dl>
	                         </el-col>
	                         <el-col :span="6">
	                            	<dl class="dllist">
		                               <dt>车型：</dt>
		                               <dd>{{ vehThisList.mobile }}</dd>
		                         </dl>
		                         <dl class="dllist">
		                               <dt>发动机号：</dt>
		                               <dd>{{ vehThisList.mobile }}</dd>
		                         </dl>
	                         </el-col>
	                         <el-col :span="6">
	                         	<dl class="dllist">
		                               <dt>车价(万)：</dt>
		                               <dd>{{ vehThisList.age }}</dd>
		                         </dl>
	                         </el-col>
                         </el-row>
        </el-tab-pane>

        <el-tab-pane>
        	<span slot="label"><i class="el-icon-service"></i> 操作详情</span>
        	<el-table :max-height="windowOutHeight-260" border :data="listData" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
	            <el-table-column type="index" label="" width="40" align="center">
	            </el-table-column>
	            <el-table-column prop="" label="关联人头像"  align="center">
	            </el-table-column>
	            <el-table-column prop="" label="关联人昵称" align="center" >
	            </el-table-column>
	             <el-table-column prop="" label="关联人姓名"  align="center">
	            </el-table-column>
	            <el-table-column prop="" label="关联人手机号" align="center" >
	            </el-table-column>
	            <el-table-column prop="" label="与车主关系" align="center" >
	            </el-table-column>
	            <el-table-column prop="" label="关联来源" align="center" >
	            </el-table-column>
	            <el-table-column prop="" label="操作人"  align="center">
	            </el-table-column>
	            <el-table-column prop="" label="操作内容" align="center" >
	            </el-table-column>
	            <el-table-column prop="" label="操作时间" align="center" >
	            </el-table-column>
	        </el-table>
	        <!--工具条-->
	        <el-pagination
	                @size-change="handleSizeChange"
	                @current-change="handleCurrentChange"
	                 :page-sizes="[15, 50, 80, 99]"
	                :page-size="pageSize"
	                 layout="total, sizes, prev, pager, next, jumper"
	                :total="total" style="text-align: right;margin-top: 5px;">
	        </el-pagination>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
	 import {getAssVeh} from '../../../api/api';
    export default {
    	props:['windowOutHeight'],
        	data() {
        		 return {
        		 	tabPosition: 'left',
        		 	listData: [],
		            total: 0,
		            pageSize:15,
		            currentPage: 1,
		            listLoading: false,
		            vehThisList:[],
		            getParams:[],//父级页面传来的数据
        		 }

        	},
        	methods: {
        		changeTab(val){
        			if (val == 0) {//第一项
        				this.handleDetails();
        			}else if (val == 1 ) {//第二项
        				this.handleQuery();
        			}
        		},
        		// 获取详情
        		handleDetails(){
        			let para = {
				vehicleid : this.getParams.row.vehicleid
			}
			getAssVeh(para).then((res) => {
		                    this.vehThisList = res.data.data.records[0];
		             });
        		},
	            //获取列表
	            handleQuery() {
	                let para = {
	                    currentPage : this.currentPage,
	                    showCount   : this.pageSize,
	                };
	                this.listLoading = true;
	                getAssVeh(para).then((res) => {
	                    this.total = res.data.data.totalResult;
	                    this.listData = res.data.data.records;
	                    this.listLoading = false;
	                });
	            },
	            //切换当前页
	            handleCurrentChange(val) {
	                this.currentPage = val;
	                this.handleQuery();
	            },
	            //切换每页显示数量
	            handleSizeChange(val) {
	                this.pageSize = val;
	                this.handleQuery();
	            },
	             //时间转换1
	            dateFormatter: function(row,col){
	                if (row.createdate == "" || row.createdate == undefined)  return;
	                return util.formatDate.format(new Date(row.createdate), 'yyyy-MM-dd');
	            },
	            //时间转换2
	            dateFormatterSecond: function(row,col){
	                if (row.updatedate == "" || row.updatedate == undefined)  return;
	                return util.formatDate.format(new Date(row.updatedate), 'yyyy-MM-dd');
	            },
	            // 性别转换
	            genderFormatter: function (row, column) {
	                return row.gender == 'M' ? '男' : row.gender == 'F' ? '女' : '暂无';
	            },
        	},
        	mounted() {
        		this.getParams = this.$route.params;//获取父级页面传来的数据
        		this.handleDetails();
        		console.log(this.getParams)
        	}
    }
</script>