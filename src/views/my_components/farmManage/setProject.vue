<!--* 
* @description: 项目设置
* @author: pl 
* @update: pl (2018-4-2) 
*-->
<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <Input v-model="filters.searchKey" @keyup.enter.native="handleQuery" placeholder="请输入查询内容">
                        <Button slot="append" @click="handleQuery" icon="ios-search"></Button>
                    </Input>
                </el-form-item>
                <el-form-item>
                    <Button type="primary" @click="handleAdd" icon="plus-round">新增</Button>
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
                            <DropdownItem name="shopname"><Checkbox v-model="checked.shopname"/>项目名称</DropdownItem>
                            <DropdownItem name="employeename"><Checkbox v-model="checked.employeename"/>项目类型</DropdownItem>
                            <DropdownItem name="shoplocation"><Checkbox v-model="checked.shoplocation"/>执行班组</DropdownItem>
                            <DropdownItem name="shoplocation"><Checkbox v-model="checked.shoplocation"/>项目工时</DropdownItem>
                            <DropdownItem name="shopuse"><Checkbox v-model="checked.shopuse"/>项目内容</DropdownItem>
                            <DropdownItem name="shoplocation"><Checkbox v-model="checked.shoplocation"/>使用产品</DropdownItem>
                            <DropdownItem name="shopuse"><Checkbox v-model="checked.shopuse"/>项目价格</DropdownItem>
                            <Button size="small" long type="primary" @click="handleDropdownClose">关闭</Button>
                        </DropdownMenu>
                    </Dropdown>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :max-height="windowOutHeight-260" border :data="listData" highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
            <el-table-column type="index" label="" width="40" align="center">
            </el-table-column>
            <el-table-column prop="shopname" label="项目名称"  align="center" v-if="isarray('shopname',curTableData)">
            </el-table-column>
            <el-table-column prop="shopname" label="项目类型"  align="center" v-if="isarray('shopname',curTableData)">
            </el-table-column>
            <el-table-column prop="employeename" label="执行班组" align="center" v-if="isarray('employeename',curTableData)">
            </el-table-column>
            <el-table-column prop="shoplocation" label="项目工时(小时)" align="center" v-if="isarray('shoplocation',curTableData)">
            </el-table-column>
            <el-table-column prop="shoplocation" label="项目内容" align="center" v-if="isarray('shoplocation',curTableData)">
            </el-table-column>
             <el-table-column prop="shoplocation" label="使用产品" align="center" v-if="isarray('shoplocation',curTableData)">
            </el-table-column>
             <el-table-column prop="shoplocation" label="项目价格(元)" align="center" v-if="isarray('shoplocation',curTableData)">
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="120">
                <template slot-scope="scope">
                    <Button type="primary" shape="circle" size="small" @click="handleEdit(scope.$index, scope.row)" title="编辑" :disabled="scope.row.isdelete == '1' ? true : false">
                        <Icon type="edit"></Icon>
                    </Button>
                    <Button type="primary" shape="circle" size="small" @click="handleDel(scope.$index, scope.row)" title='删除'>
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

        <!--编辑界面-->
        <el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" :rules="editFormRules" ref="editForm">
                            <el-col :span="24">
                                <el-form-item label="" prop="shopname">
                                    <el-input v-model="editForm.shopname" auto-complete="off">
                                        <template slot="prepend">项目名称</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="" prop="shopname">
                                    <el-input v-model="editForm.shopname" auto-complete="off">
                                        <template slot="prepend">项目类型</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="执行班组" prop="employeename">
                                        <el-select  style="width:80%;" v-model="editForm.employeename" filterable clearable placeholder="请输入车间负责人" @visible-change="chooseEmp"
                                            remote
                                            :remote-method="remoteMethodEmp"
                                            :loading="empLoading">
                                            <el-option
                                              v-for="item in empOptions"
                                              :key="item.id"
                                              :label="item.employeename + ' - ' + item.mobile + ' - ' + item.deptname"
                                              :value="item.id">
                                            </el-option>
                                          </el-select>
                                    </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="" prop="shopname">
                                    <el-input v-model="editForm.shopname" auto-complete="off">
                                        <template slot="prepend">项目工时</template>
                                        <template slot="append">小时</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="" prop="shoplocation">
                                    <el-input v-model="editForm.shoplocation" auto-complete="off">
                                        <template slot="prepend">项目价格</template>
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="项目内容" prop="shopname">
                                    <el-input v-model="editForm.shopuse" auto-complete="off" type="textarea"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="使用产品" prop="shoplocation">
                                    <el-input v-model="editForm.shopuse" auto-complete="off" type="textarea"></el-input>
                                </el-form-item>
                            </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <Button @click.native="editFormVisible = false">取消</Button>
                <Button type="primary" @click.native="editSubmit" :loading="editLoading">提交</Button>
            </div>
        </el-dialog>


        <!--新增界面-->
        <el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" :rules="addFormRules" ref="addForm">
                        <el-col :span="24">
                                <el-form-item label="" prop="shopname">
                                    <el-input v-model="addForm.shopname" auto-complete="off">
                                        <template slot="prepend">项目名称</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="" prop="shopname">
                                    <el-input v-model="addForm.shopname" auto-complete="off">
                                        <template slot="prepend">项目类型</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="执行班组" prop="employeename">
                                        <el-select  style="width:80%;" v-model="addForm.employeename" filterable clearable placeholder="请输入车间负责人" @visible-change="chooseEmp"
                                            remote
                                            :remote-method="remoteMethodEmp"
                                            :loading="empLoading">
                                            <el-option
                                              v-for="item in empOptions"
                                              :key="item.id"
                                              :label="item.employeename + ' - ' + item.mobile + ' - ' + item.deptname"
                                              :value="item.id">
                                            </el-option>
                                          </el-select>
                                    </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="" prop="shopname">
                                    <el-input v-model="addForm.shopname" auto-complete="off">
                                        <template slot="prepend">项目工时</template>
                                        <template slot="append">小时</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="" prop="shoplocation">
                                    <el-input v-model="addForm.shoplocation" auto-complete="off">
                                        <template slot="prepend">项目价格</template>
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="项目内容" prop="shopname">
                                    <el-input v-model="addForm.shopuse" auto-complete="off" type="textarea"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="使用产品" prop="shoplocation">
                                    <el-input v-model="addForm.shopuse" auto-complete="off" type="textarea"></el-input>
                                </el-form-item>
                            </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <Button @click.native="addFormVisible = false">取消</Button>
                <Button type="primary" @click.native="addSubmit" :loading="addLoading">提交</Button>
            </div>
        </el-dialog>


    </section>
</template>
<style type="text/css">
</style>
<script>
    import util from '../../../styles/js/util'
    import {addFarm,modifyFarm,removeFarm,getEmpList,getFarmList,getTeamworkList} from '../../../api/api';
    export default {
        props:['windowOutHeight'],
        data() {
            return {
                checked:{//自定义下拉框checkbox
                  shopname:true,
                  employeename:true,
                  shoplocation:true,
                  shopuse:true,
                },
                curTableData:['shopname','employeename','shoplocation','shopuse'],//自定义显示列组
                selectColVisible:false,//自定义下拉框隐藏
                fmtdata:util,
                filters: {
                    searchKey:'',//查询框
                },
                empLoading:false,
                user:'',
                empOptions:[],//负责人
                listData: [],
                total: 0,
                pageSize:15,
                currentPage: 1,
                listLoading: false,
                sels: [],//列表选中列
                addFormVisible:false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    
                },
                //新增界面数据
                addForm: {
                    shopname:'',
                    employeename:'',
                    shoplocation:'',
                    shopuse:'',
                    isenable:true,
                },
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    
                },
                //编辑界面数据
                editForm: {
                    id:'',
                    shopname:'',
                    employeename:'',
                    shoplocation:'',
                    shopuse:'',
                    isenable:'',
                },
                farmLoading:false,
                farmList:[],//所属车间列表
                teamworkLoading:false,
                teamworkList:[],//所属车间列表
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

            // 下拉所属车间
            chooseFarm(){
                getFarmList().then((res) =>{
                    this.farmList = res.data.data.records;
                });
            },
            // 工位所属车间远程搜索
            remoteMethodFarm(query){
                if (query !== '') {
                    this.farmLoading = true;
                    setTimeout(() => {
                        this.farmLoading = false;
                        let para = {
                            deptname:query
                        }
                        getFarmList(para).then((res) =>{
                            this.farmList = res.data.data.records;
                        });
                    }, 200);
                } else {
                    this.farmList = [];
                }
            },
            // 下拉常用班组
            chooseTeamwork(){
                getTeamworkList().then((res) =>{
                    this.teamworkList = res.data.data.records;
                });
            },
            // 工位常用班组远程搜索
            remoteMethodTeamwork(query){
                if (query !== '') {
                    this.teamworkLoading = true;
                    setTimeout(() => {
                        this.teamworkLoading = false;
                        let para = {
                            deptname:query
                        }
                        getTeamworkList(para).then((res) =>{
                            this.teamworkList = res.data.data.records;
                        });
                    }, 200);
                } else {
                    this.teamworkList = [];
                }
            },
            // 下拉负责人
            chooseEmp(){
                getEmpList().then((res) =>{
                    this.empOptions = res.data.data.records;
                });
            },
            // 负责人远程搜索
            remoteMethodEmp (query) {
                if (query !== '') {
                    this.empLoading = true;
                    setTimeout(() => {
                        this.empLoading = false;
                        let para = {
                            employeename:query
                        }
                        getEmpList(para).then((res) =>{
                            this.empOptions = res.data.data.records;
                        });
                    }, 200);
                } else {
                    this.empOptions = [];
                }
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
            // 启用转换
            enableFormat: function(row,col){
                return row.isenable == '1' ? '启用' : '关闭';
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
                getFarmList(para).then((res) => {
                    this.total = res.data.data.totalResult;
                    this.listData = res.data.data.records;
                    this.listLoading = false;
                });
            },
            // 类型过滤搜索
            filterTag(value, row) {
                return row.type === value;
            },
           
            //删除
            handleDel: function (index, row) {
                    this.$confirm('确认删除该条数据吗？', '提示', {
                        type: 'warning'
                    }).then(() => {
                        this.listLoading = true;
                        let para = { 
                            id: row.id
                        };
                        removeFarm(para).then((res) => {
                            if (res.data.result.code == 0) {
                                this.listLoading = false;
                                this.$message ({
                                    message : '删除成功',
                                    center: true,
                                    type: 'success'
                                });
                                this.handleQuery();
                            }
                        });
                    }).catch(() => {
                    });
            },
            //启用
            handleOpen: function (index,row) {
                    let para = {
                            id:row.id,
                            isenable:row.isenable == '1' ? '0' : '1'
                        }
                        modifyFarm(para).then((res) => {
                            if (res.data.result.code == 0) {
                                this.editLoading = false;
                                this.$message ({
                                    message : '设置成功',
                                    center: true,
                                    type: 'success'
                                });
                                this.handleQuery();
                            }
                        });
            },

            //显示编辑界面
            handleEdit: function (index,row) {
                this.editFormVisible = true;
                this.editForm = {
                    id:row.id,
                    shopname:row.shopname,
                    employeename:row.employeename,
                    shoplocation:row.shoplocation,
                    shopuse:row.shopuse,
                    isenable:row.isenable == '1' ? true : false
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.editLoading = true;
                        let para = {
                            id:this.editForm.id,
                            shopname:this.editForm.shopname,
                            pic:this.editForm.employeename,
                            shoplocation:this.editForm.shoplocation,
                            shopuse:this.editForm.shopuse,
                            isenable:this.editForm.isenable == true ? '1' : '0'
                        }
                        modifyFarm(para).then((res) => {
                            if (res.data.result.code == 0) {
                                this.editLoading = false;
                                this.$message ({
                                    message : '修改成功',
                                    center: true,
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.handleQuery();
                            }
                        });
                    }else{
                        this.editLoading = false;
                    }
                });
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm={
                        shopname:'',
                        employeename:'',
                        shoplocation:'',
                        shopuse:'',
                        isenable:true,
                }
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.addLoading = true;
                        let para = {
                            shopname:this.addForm.shopname,
                            pic:this.addForm.employeename,
                            shoplocation:this.addForm.shoplocation,
                            shopuse:this.addForm.shopuse,
                            isenable:this.addForm.isenable == true ? '1' : '0'
                        }
                        addFarm(para).then((res) => {
                            if (res.data.result.code == 0) {
                                this.addLoading = false;
                                this.$Message.success('新增成功');
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.handleQuery();
                            }else{
                                this.addLoading = false;
                            }
                        });
                    }
                });
            },
            //清空查询表单
            resetForm() {
                    this.filters.searchKey = '';
            },
        },
        mounted() {
            this.handleQuery();

            // 得到登陆的用户信息
            this.user = JSON.parse(sessionStorage.getItem('user'));
        },
    }
</script>
