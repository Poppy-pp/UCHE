<!--* 
* @description: 班组设置
* @author: pl 
* @update: pl (2018-3-12) 
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
                            <DropdownItem name="groupname"><Checkbox v-model="checked.groupname"/>班组名称</DropdownItem>
                            <DropdownItem name="grouptypename"><Checkbox v-model="checked.grouptypename"/>班组类型</DropdownItem>
                            <DropdownItem name="leadername"><Checkbox v-model="checked.leadername"/>班组负责人</DropdownItem>
                            <DropdownItem name="empcount"><Checkbox v-model="checked.empcount"/>班组成员</DropdownItem>
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
            <el-table-column prop="groupname" label="班组名称"  align="center" v-if="isarray('groupname',curTableData)">
            </el-table-column>
            <el-table-column prop="grouptypename" label="班组类型" align="center" v-if="isarray('grouptypename',curTableData)">
            </el-table-column>
            <el-table-column prop="leadername" label="班组负责人" align="center" v-if="isarray('leadername',curTableData)">
            </el-table-column>
            <el-table-column prop="empcount" label="班组成员"  align="center" v-if="isarray('empcount',curTableData)">
                <template slot-scope="scope">
                    <el-popover ref="popover4" placement="right" width="400" @show="showNumData(scope.row.id)" trigger="hover">
                        <el-table border :data="groupNumData" max-height="400">
                            <el-table-column type="index" width="30" align="center" label="#">
                            </el-table-column>
                            <el-table-column prop="employeename" label="成员姓名" align="center"></el-table-column>
                        </el-table>
                    </el-popover>
                    <a href="javascript:void(0);" v-popover:popover4>
                        <el-tag size="medium">{{ scope.row.empcount }}</el-tag>
                    </a>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="100">
                <template slot-scope="scope">
                    <Button type="primary" shape="circle" size="small" @click="handleEdit(scope.$index, scope.row)" title="编辑用户" :disabled="scope.row.isdelete == '1' ? true : false">
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
                                <el-form-item label="" prop="groupname">
                                    <el-input v-model="editForm.groupname" auto-complete="off">
                                        <template slot="prepend">班组名称</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="班组类型" prop="grouptype">
                                    <el-select v-model="editForm.grouptype" clearable filterable placeholder="请选择班组类型" @visible-change="chooseType">
                                        <el-option
                                          v-for="item in teamType"
                                          :key="item.dictdataname"
                                          :label="item.dictdatavalue"
                                          :value="item.dictdataname">
                                        </el-option>
                                    </el-select>
                                 </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="班组所属部门" prop="deptname">
                                    <el-select v-model="editForm.deptname" clearable filterable placeholder="请选择班组所属部门" @visible-change="chooseDept"
                                        remote 
                                        :remote-method="remoteMethodDept"
                                        :loading="deptLoading">
                                        <el-option
                                          v-for="item in deptList"
                                          :key="item.id"
                                          :label="item.deptname"
                                          :value="item.id">
                                        </el-option>
                                    </el-select>
                                 </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="班组负责人" prop="groupleader">
                                        <el-select  style="width:80%;" v-model="editForm.groupleader" filterable clearable placeholder="请输入班组负责人" @visible-change="chooseEmp"
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
                                <el-form-item label="班组成员" prop="editEmps">
                                    <el-select v-model="editForm.editEmps" placeholder="请选择班组成员" style="width:90%;" multiple filterable clearable @visible-change="chooseEmp"
                                            remote
                                            :remote-method="remoteMethodEmp"
                                            :loading="empLoading"
                                            value-key="employeename">
                                          <el-option
                                            v-for="item in empOptions"
                                            :key="item.employeename"
                                            :label="item.employeename + ' - ' + item.mobile + ' - ' + item.deptname"
                                            :value="item">
                                          </el-option>
                                    </el-select>
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
                                <el-form-item label="" prop="groupname">
                                    <el-input v-model="addForm.groupname" auto-complete="off">
                                        <template slot="prepend">班组名称</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="班组类型" prop="grouptype">
                                    <el-select v-model="addForm.grouptype" clearable filterable placeholder="请选择班组类型" @visible-change="chooseType">
                                        <el-option
                                          v-for="item in teamType"
                                          :key="item.dictdataname"
                                          :label="item.dictdatavalue"
                                          :value="item.dictdataname">
                                        </el-option>
                                    </el-select>
                                 </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="班组所属部门" prop="deptname">
                                    <el-select v-model="addForm.deptname" clearable filterable placeholder="请选择班组所属部门" @visible-change="chooseDept"
                                        remote 
                                        :remote-method="remoteMethodDept"
                                        :loading="deptLoading">
                                        <el-option
                                          v-for="item in deptList"
                                          :key="item.id"
                                          :label="item.deptname"
                                          :value="item.id">
                                        </el-option>
                                    </el-select>
                                 </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="班组负责人" prop="groupleader">
                                        <el-select  style="width:80%;" v-model="addForm.groupleader" filterable clearable placeholder="请输入班组负责人" @visible-change="chooseEmp"
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
                                <el-form-item label="班组成员" prop="addEmps">
                                    <el-select v-model="addForm.addEmps" placeholder="请选择班组成员" style="width:90%;" multiple filterable clearable @visible-change="chooseEmp"
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
    import {getTeamworkList,addTeamwork,modifyTeamwork,removeTeamwork,getDropDown,getDeptList,getEmpList} from '../../../api/api';
    export default {
        props:['windowOutHeight'],
        data() {
            return {
                checked:{//自定义下拉框checkbox
                  groupname:true,
                  grouptypename:true,
                  leadername:true,
                  empcount:true,
                },
                curTableData:['groupname','grouptypename','leadername','empcount'],//自定义显示列组
                selectColVisible:false,//自定义下拉框隐藏
                fmtdata:util,
                filters: {
                    searchKey:'',//查询框
                },
                empLoading:false,
                deptLoading:false,
                empOptions:[],//负责人列表
                teamType:[],//班组类型
                teamEmp:[],//班组成员
                groupNumData: [], //组人数详情列表
                deptList:[],//所属部门列表
                user:'',
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
                    groupname:'',
                    grouptype:'',
                    deptname:'',
                    groupleader:'',
                    addEmps:[],
                },
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    
                },
                //编辑界面数据
                editForm: {
                    id:'',
                    groupname:'',
                    grouptype:'',
                    deptid:'',
                    deptname:'',
                    groupleader:'',
                    groupleaderid:'',
                    editEmps:[],
                },
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
            // 下拉班组
            chooseType(){
                let para = {
                    dictvalue:'GroupType'
                }
                getDropDown(para).then((res) =>{
                    this.teamType = res.data.data.records;
                });
            },
            // 下拉所属部门
            chooseDept(){
                getDeptList().then((res) =>{
                    this.deptList = res.data.data.records;
                });
            },
            // 班组所属部门远程搜索
            remoteMethodDept(query){
                if (query !== '') {
                    this.deptLoading = true;
                    setTimeout(() => {
                        this.deptLoading = false;
                        let para = {
                            deptname:query
                        }
                        getDeptList(para).then((res) =>{
                            this.deptList = res.data.data.records;
                        });
                    }, 200);
                } else {
                    this.deptList = [];
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
            // 组人数详情列表
            showNumData(id) {
                this.listData.forEach((item, index) => {
                    if (item.id == id) {
                        this.groupNumData = item.emps;
                    }
                });
            },
            
            // 性别转换
            genderFormatter: function (row, column) {
                return row.gender == 'M' ? '男' : row.gender == 'F' ? '女' : '暂无';
            },
            // 分类转换
            custcategoryFormatter: function (row, column) {
                return row.custcategory == 'A' ? 'A类' : row.custcategory == 'B' ? 'B类' : row.custcategory == 'C' ? 'C类' : row.custcategory == 'D' ? 'D类' : '暂无';
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
                getTeamworkList(para).then((res) => {
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
                if (row.empcount > 0) {
                    this.$confirm('该班组下还有 ' + row.empcount + ' 位组员，' + '确认一并删除吗？', '提示', {
                        type: 'warning'
                    }).then(() => {
                        this.listLoading = true;
                        let para = { 
                            id: row.id
                        };
                        removeTeamwork(para).then((res) => {
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
                }else{
                        this.listLoading = true;
                        let para = { 
                            id: row.id
                        };
                        removeTeamwork(para).then((res) => {
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
                }
            },
            //显示编辑界面
            handleEdit: function (index,row) {
                this.editFormVisible = true;
                this.editForm = {
                    id:row.id,
                    groupname:row.groupname,
                    grouptype:row.grouptypename,
                    grouptypename:row.grouptype,
                    deptid:row.deptid,
                    deptname:row.deptname,
                    groupleaderid:row.leaderid,
                    groupleader:row.leadername,
                    editEmps:[],
                };
                this.empOptions = row.emps;
                this.editForm.editEmps = row.emps;
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.editLoading = true;
                        let para = {
                            id:this.editForm.id,
                            groupname:this.editForm.groupname,
                            grouptype:this.editForm.grouptypename,
                            groupleaderid:this.editForm.groupleaderid,
                            deptid:this.editForm.deptid,
                            empids:[],
                        }
                        var empsIds = new Array();
                        this.editForm.editEmps.forEach(function(item, index) {
                            empsIds.push(item.id);
                        });
                        para.empids = empsIds;

                        modifyTeamwork(para).then((res) => {
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
                        groupname:'',
                        grouptype:'',
                        deptname:'',
                        groupleader:'',
                        addEmps:[],
                }
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.addLoading = true;
                        let para = {
                            groupname:this.addForm.groupname,
                            grouptype:this.addForm.grouptype,
                            groupleaderid:this.addForm.groupleader,
                            deptid:this.addForm.deptname,
                            empids:this.addForm.addEmps,
                        }
                        addTeamwork(para).then((res) => {
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
