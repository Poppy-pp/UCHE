<!--* 
* @description: 订单管理
* @author: pl 
* @update: pl (2017-11-16 10:55) 
*-->
<template>
	<section>
	<Col :span="24" class="stepState">
		<RadioGroup type="button" v-model="stepState" @on-change="changeStateHandle">
		   <Radio :disabled="listLoading" label="0">全部订单：{{ fromNum.num0 }}</Radio>
                            <Radio :disabled="listLoading" label="1">进行中：{{ fromNum.num1 }}</Radio>
                            <Radio :disabled="listLoading" label="2">成交订单：{{ fromNum.num2 }}</Radio>
                            <Radio :disabled="listLoading" label="3">取消订单：{{ fromNum.num3 }}</Radio>
	  	</RadioGroup>
	</Col>

        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <Input v-model="filters.searchKey" @keyup.enter.native="handleQuery" placeholder="请输入查询内容">
                    	<Button slot="append" @click="handleQuery" icon="ios-search"></Button>
                    </Input>
                </el-form-item>
                <el-form-item>
                	<Button type="primary" @click="resetForm" icon="loop">重置</Button>
                </el-form-item>
                <el-form-item style="float:right;marginRight:0;">
                    <Dropdown trigger="custom" :visible="selectColVisible" @on-click="handleSelectCols" class="selectcol">
                        <a href="javascript:void(0)" @click="handleDropdownOpen">
                            <Button type="primary">自定义列
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="orderno"><Checkbox v-model="checked.orderno"/>订单号</DropdownItem>
                            <DropdownItem name="custname"><Checkbox v-model="checked.custname"/>客户姓名</DropdownItem>
                            <DropdownItem name="mobile"><Checkbox v-model="checked.mobile"/>联系方式</DropdownItem>
                            <DropdownItem name="name"><Checkbox v-model="checked.name"/>订单流程</DropdownItem>
                            <DropdownItem name="order_type"><Checkbox v-model="checked.order_type"/>订单状态</DropdownItem>
                            <DropdownItem name="model"><Checkbox v-model="checked.model"/>选定车辆</DropdownItem>
                            <DropdownItem name="paymentmode"><Checkbox v-model="checked.paymentmode"/>付款方式</DropdownItem>
                            <DropdownItem name="actualvehicleprice"><Checkbox v-model="checked.actualvehicleprice"/>成交价格(万)</DropdownItem>
                            <Button size="small" long type="primary" @click="handleDropdownClose">关闭</Button>
                        </DropdownMenu>
                    </Dropdown>
                </el-form-item>
                <el-form-item style="float:right;">
                  <Button type="primary" @click="$router.push({name: 'customerManage'})" icon="ios-shuffle">转到客户登记</Button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :max-height="windowOutHeight-260" border :data="listData" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
            <el-table-column type="index" label="" width="40" align="center">
            </el-table-column>
            <el-table-column prop="orderno" label="订单号" align="center" v-if="isarray('orderno',curTableData)" width="160">
            </el-table-column>
            <el-table-column prop="custname" label="客户姓名"  align="center" v-if="isarray('custname',curTableData)" width="80">
            </el-table-column>
            <el-table-column prop="mobile" label="联系方式"align="center" v-if="isarray('mobile',curTableData)" width="100">
            </el-table-column>
            <el-table-column prop="name" label="订单流程"  align="center" v-if="isarray('name',curTableData)" width="90">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>当前订单流程: {{ scope.row.name }}</p>
                      <p>代理人: {{ scope.row.assignee }}</p>
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                      </div>
                    </el-popover>
                  </template>
            </el-table-column>
            <el-table-column prop="order_type" label="订单状态" align="center" v-if="isarray('order_type',curTableData)" width="90"
                :filters="[{ text: '签合同', value: '2' }, { text: '付款', value: '3' }, { text: '交车', value: '4' }, { text: '保险', value: '5' }, { text: '上牌', value: '6' },{ text: '取消', value: '-1' }, { text: '完成', value: '0' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end" >
                  <template slot-scope="scope">
                    <el-tag
                      :type="scope.row.order_type == '0' ? 'success' : scope.row.order_type == '-1' ? 'danger' : 'primary'"
                      close-transition>{{scope.row.order_type == '-1' ? '取消' : scope.row.order_type == '0' ? '完成' : scope.row.order_type == '2' ? '签合同' : scope.row.order_type == '3' ? '付款' : scope.row.order_type == '4' ? '交车' : scope.row.order_type == '5' ? '保险' : scope.row.order_type == '6' ? '上牌' : '未知'}}</el-tag>
                  </template>
            </el-table-column>
            <el-table-column prop="model" label="选定车辆"  align="center" v-if="isarray('model',curTableData)">
            </el-table-column>
            <el-table-column prop="paymentmode" label="付款方式" align="center" :formatter="payFormatter"  v-if="isarray('paymentmode',curTableData)" width="80">
            </el-table-column>
             <el-table-column prop="actualvehicleprice" label="成交价格(万)" align="center" v-if="isarray('actualvehicleprice',curTableData)" width="90">
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="120">
                <template slot-scope="scope">
                    <Button type="primary" shape="circle" size="small" @click="handleDetails(scope.$index, scope.row)" title="详情" :disabled="scope.row.isdelete == '1' ? true : false">
                        <Icon type="eye"></Icon>
                    </Button>
                    <Button type="primary" shape="circle" size="small" @click="handleEdit(scope.$index, scope.row)" title="移交订单" :disabled="scope.row.isdelete == '1' ? true : false">
                        <Icon type="shuffle"></Icon>
                    </Button>
                    <Button type="primary" shape="circle" size="small" @click="handleChange(scope.$index, scope.row)" title='删除'>
                        <Icon type="trash-a"></Icon>
                    </Button>
                </template>
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



         <!-- 移交订单 start-->
        <Modal
            v-model="handleOverVisible"
            title="移交订单"
            @on-ok="handleOverSubmit"
            @on-cancel="handleOverVisible = false"
            loading
            ok-text="确认移交"
            width="350">
            <Select v-model="empId" filterable clearable placeholder="请选择移交人" @on-change="chooseEmp">
                <Option v-for="item in empList" :value="item.userid" :key="item.userid">{{ item.employeename }}</Option>
            </Select>
        </Modal>


    </section>
</template>
<style type="text/css">
    .disabled{color:#D7D9E2;}
    .userchedaa .el-checkbox{
        margin-right: 15px;
        margin-bottom: 15px;
        margin-left: 0;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 150px !important;
        margin:10px 10px 0 0;
        vertical-align: bottom;
    }
    .el-tag + .el-tag{
        margin-bottom: 10px;
    }
</style>
<script>
    import util from '../../../styles/js/util'
    import {getallOrders,getProcessNum,getallEmps,handleOverOrder,removeOrders} from '../../../api/api';
    export default {
        props:['windowOutHeight'],
        data() {
            return {
                checked:{//自定义下拉框checkbox
                  orderno:true,
                  custname:true,
                  mobile:true,
                  name:true,
                  order_type:true,
                  model:true,
                  paymentmode:true,
                  actualvehicleprice:true,
                },
                curTableData:['orderno','custname','mobile','name','order_type','model','paymentmode','actualvehicleprice'],//自定义显示列组
                selectColVisible:false,//自定义下拉框隐藏
                fmtdata:util,
                filters: {
                    searchKey:'',//查询框
                },
                stepState:0,//页面
                fromNum:{
          		num0:0,
          		num1:0,
                         num2:0,
                         num3:0,
          	   },
               handleOverVisible:false,
               empId:'',//移交人
               rowId:'',//移交当前任务id
               empList:[],//移交员工列表
                user:'',
                listData: [],
                total: 0,
                pageSize:15,
                currentPage: 1,
                listLoading: false,
                sels: [],//列表选中列
            }
        },
        methods: {
            // 自定义显示列
            isarray(value,array){//判断是否选择
              for(let i = 0,len = array.length;i<len;i++){
                if(array[i] == value) return true;
              }
              return false;
            },
            handleSelectCols(val){//选择列表时
                  if(!this.checked[val]){//checkbox未选中，要选择时
                     this.checked[val] = true;//将checkbox选中
                     if(!this.isarray(val,this.curTableData))//如果不存在，push
                        this.curTableData.push(val);
                  }else{//checkbox已选中，取消选择时
                    this.checked[val] = false;//将checkbox取消选中
                    if(this.isarray(val,this.curTableData)){//如果存在，删除
                      this.curTableData.forEach((item,index)=>{
                        if(item == val){
                          this.curTableData.splice(index,1);
                        }
                      });
                    }
                  }
            },
            // 下拉菜单
            handleDropdownOpen () {
                this.selectColVisible = true;
            },
            handleDropdownClose () {
                this.selectColVisible = false;
            },
        	// 点击state
        	changeStateHandle:function(val){
                if (val == 0) {//当点击——全部
                    this.handleQuery();
                }else if (val == 1) {//当点击——进行中
                    let para = {
                        currentPage : this.currentPage,
                        showCount   : this.pageSize,
                        searchKey:this.filters.searchKey,
                        order_type:2,//进行中订单
                    };
                    this.listLoading = true;
                    getallOrders(para).then((res) => {
                        this.total = res.data.data.totalResult;
                        this.listData = res.data.data.records;
                        this.listLoading = false;
                    });
                }else if (val == 2) {//当点击——成交
                    let para = {
                        currentPage : this.currentPage,
                        showCount   : this.pageSize,
                        searchKey:this.filters.searchKey,
                        order_type:0,//完成订单
                    };
                    this.listLoading = true;
                    getallOrders(para).then((res) => {
                        this.total = res.data.data.totalResult;
                        this.listData = res.data.data.records;
                        this.listLoading = false;
                    });
                }else if (val == 3) {//当点击——取消
                    let para = {
                        currentPage : this.currentPage,
                        showCount   : this.pageSize,
                        searchKey:this.filters.searchKey,
                        order_type:-1,//取消订单
                    };
                    this.listLoading = true;
                    getallOrders(para).then((res) => {
                        this.total = res.data.data.totalResult;
                        this.listData = res.data.data.records;
                        this.listLoading = false;
                    });
                }
        	},
            

            
          
            // 付款方式
            payFormatter: function (row, column) {
                return row.paymentmode == 'FULL' ? '全款' : row.paymentmode == 'LOAN' ? '贷款' : '暂无';
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
            //获取保单列表
            handleQuery() {
                let para = {
                    currentPage : this.currentPage,
                    showCount   : this.pageSize,
                    searchKey:this.filters.searchKey,
                };
                this.listLoading = true;
                getallOrders(para).then((res) => {
                    this.total = res.data.data.totalResult;
                    this.listData = res.data.data.records;
                    this.listLoading = false;
                    this.fromNum.num0 = this.total;
                });
                // 获取状态总数
                getProcessNum().then((res) => {
                    this.fromNum.num1 = res.data.data.oth;
                    this.fromNum.num2 = res.data.data.success;
                    this.fromNum.num3 = res.data.data.cancel;
                });
            },
            // 过滤搜索
            filterTag(value, row) {
                return row.order_type === value;
            },
            // 显示详情
            handleDetails: function (index,row) {//跳转详情流程页面
              this.$router.push({
                  name: 'orderDetails',
                  params: { row }
              });
            },
            // 移交订单按钮
            handleEdit: function (index,row) {
                if (row.order_type == '0' || row.order_type == '-1') {
                     this.$Message.error('当前订单节点不可移交！');
                     return;
                }
              this.handleOverVisible = true;
              this.rowId = row.id;//存储任务id
              getallEmps().then((res) => { // 获取移交人列表
                this.empList = res.data.data.records;
              });
            },
            chooseEmp(val){//选择移交人
                this.empId = val;
            },
            handleOverSubmit: function () {//提交移交人
                let para = {
                    userid:this.empId,
                    taskid:this.rowId
                }
                handleOverOrder(para).then((res) => {
                    if (res.data.result.code == 0) {
                            this.$message ({
                                message : res.data.data.result,
                                center: true,
                                type: 'success'
                            });
                            this.handleOverVisible = false;
                            this.handleQuery();
                    }
                });
            },
            //删除
            handleChange: function(index,row){
                if (row.order_type == '0') {
                    this.$Message.error('当前订单节点不可删除！');
                    return;
                }
                this.$prompt('请输入删除原因', '提示', {
                  confirmButtonText: '确定删除',
                  cancelButtonText: '取消',
                }).then(({ value }) => {
                    let para ={
                        orderid:row.orderid,
                        executionid:row.executionid,
                        reason:value
                    }
                    removeOrders(para).then((res) => {
                        if (res.data.result.code == 0) {
                                this.$message({
                                    type: 'success',
                                    message: res.data.data.result +' 删除原因是: ' + value
                                });
                                this.handleQuery();
                        }
                    });
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '取消删除'
                  });       
                });
            },
            
            //清空查询表单
	resetForm() {
	        this.filters.searchKey = '';
	},
            selsChange: function (sels) {
                this.sels = sels;
            },
        },
        mounted() {
            this.handleQuery();

            // 得到登陆的用户信息
            this.user = JSON.parse(sessionStorage.getItem('user'));
        },
    }
</script>
