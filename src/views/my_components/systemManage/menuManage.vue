<!-- 菜单管理 -->
<template>
	<section class="tab_content-wrapper">
		<el-input
		  style="margin-bottom:10px"
		  placeholder="输入关键字进行过滤"
		  v-model="filterText">
		</el-input>
		<el-tree
		  class="filter-tree"
		  :data="vasRegions"
		  :props="defaultProps"
		  highlight-current
		  default-expand-all
		  node-key="id"
		  :filter-node-method="filterNode"
  		  :render-content="renderContent"
		  ref="tree2">
		</el-tree>
		  <!--编辑界面-->
		<Modal title="编辑" :modal-append-to-body="false" v-model="editFormVisible" :close-on-click-modal="false" width="700">
			<el-form :model="editForm" :rules="editFormRules" ref="editForm">
				<el-row :gutter="20">
			    		<el-col :span="12">
			    			<el-form-item label="" prop="id">
							<el-input readonly size="small" v-model="editForm.id" auto-complete="off">
								<template slot="prepend">资源ID</template>
							</el-input>
						</el-form-item>
		 				<el-form-item label="" prop="name">
							<el-input size="small" v-model="editForm.name" auto-complete="off">
								<template slot="prepend">资源名称</template>
							</el-input>
						</el-form-item>
						<el-form-item label="" prop="reskey">
							<el-input size="small" v-model="editForm.reskey"  auto-complete="off">
								<template slot="prepend">代码</template>
							</el-input>
						</el-form-item>
						<el-form-item label="" prop="resurl">
							<el-input size="small" v-model="editForm.resurl" auto-complete="off">
								<template slot="prepend">URL</template>
							</el-input>
						</el-form-item>
						<el-form-item label="" prop="icon">
							<el-input size="small" v-model="editForm.icon" auto-complete="off">
								<template slot="prepend">图标</template>
							</el-input>
						</el-form-item>
						<el-form-item label="" prop="reslevel">
							<el-input size="small" v-model="editForm.reslevel" auto-complete="off">
								<template slot="prepend">级别</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="" prop="parentid">
							<el-input readonly size="small" v-model="editForm.parentid" auto-complete="off">
								<template slot="prepend">父级ID</template>
							</el-input>
						</el-form-item>
						<el-form-item label="" prop="parentname">
							<el-input readonly size="small" v-model="editForm.parentname" auto-complete="off">
								<template slot="prepend">父级名称</template>
							</el-input>
						</el-form-item>
						<el-form-item label="" prop="rpturl">
							<el-input size="small" v-model="editForm.rpturl" auto-complete="off">
								<template slot="prepend">报表URL</template>
							</el-input>
						</el-form-item>
						<el-form-item label="" prop="description">
							<el-input size="small" v-model="editForm.description" auto-complete="off">
								<template slot="prepend">描述</template>
							</el-input>
						</el-form-item>
						<el-form-item label="是否显示" prop="hidden">
						    <el-switch
							    v-model="editForm.hidden"
							    active-text="显示"
  							    inactive-text="不显示"
  							    active-value="0"
    							    inactive-value="1">
							</el-switch>
						</el-form-item>
						<el-form-item label="类型" prop="restype">
							<el-radio-group size="small" v-model="editForm.restype">
							    <el-radio-button label="1">页面</el-radio-button>
							    <el-radio-button label="2">按钮</el-radio-button>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<Button @click.native="editFormVisible = false">取消</Button>
				<Button type="primary" @click.native="editSubmit" :loading="editLoading">提交</Button>
			</div>
		</Modal>

		<!--新增界面-->
		<Modal title="新增" :modal-append-to-body="false" size="small" v-model="addFormVisible" :close-on-click-modal="false" width="700">
			<el-form :model="addForm" :rules="addFormRules" ref="addForm">
 				<el-row :gutter="20">
			    		<el-col :span="24">
		 				<el-form-item label="" prop="name">
							<el-input size="small" v-model="addForm.name" auto-complete="off">
								<template slot="prepend">资源名称</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="" prop="reskey">
							<el-input size="small" v-model="addForm.reskey"  auto-complete="off">
								<template slot="prepend">代码</template>
							</el-input>
						</el-form-item>
						<el-form-item label="" prop="resurl">
							<el-input size="small" v-model="addForm.resurl" auto-complete="off">
								<template slot="prepend">URL</template>
							</el-input>
						</el-form-item>
						<el-form-item label="" prop="icon">
							<el-input size="small" v-model="addForm.icon" auto-complete="off">
								<template slot="prepend">图标</template>
							</el-input>
						</el-form-item>
						<el-form-item label="" prop="reslevel">
							<el-input size="small" v-model="addForm.reslevel" auto-complete="off">
								<template slot="prepend">级别</template>
							</el-input>
						</el-form-item>
						<el-form-item label="" prop="rpturl">
							<el-input size="small" v-model="addForm.rpturl" auto-complete="off">
								<template slot="prepend">报表URL</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
		 				<el-form-item label="" prop="parentid">
							<el-input readonly size="small" v-model="addForm.parentid" auto-complete="off">
								<template slot="prepend">父级ID</template>
							</el-input>
						</el-form-item>
						<el-form-item label="" prop="parentname">
							<el-input readonly size="small" v-model="addForm.parentname" auto-complete="off">
								<template slot="prepend">父级名称</template>
							</el-input>
						</el-form-item>
						<el-form-item label="" prop="description">
							<el-input size="small" v-model="addForm.description" auto-complete="off">
								<template slot="prepend">描述</template>
							</el-input>
						</el-form-item>
						<el-form-item label="是否显示" prop="hidden">
						    <el-switch
							    v-model="addForm.hidden"
							    active-text="显示"
  							    inactive-text="不显示"
  							    active-value="0"
    							    inactive-value="1">
							</el-switch>
						</el-form-item>
						<el-form-item label="类型" prop="restype">
							<el-radio-group size="small" v-model="addForm.restype">
							    <el-radio-button label="1">页面</el-radio-button>
							    <el-radio-button label="2">按钮</el-radio-button>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<Button @click.native="addFormVisible = false">取消</Button>
				<Button type="primary" @click.native="addSubmit" :loading="addLoading">提交</Button>
			</div>
		</Modal>
	</section>
</template>
<script>
	import util from '../../../styles/js/util';
	import {getMenuList,addMenu,modifyMenu,removeMenu} from '../../../api/api';
	// import {getSysResourceInfoList,addSysResourceInfo,modifySysResourceInfo,removeSysResourceInfo} from '../../api/api';

  export default {
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    data() {
      return {
            filterText: '',
            store:null,
            treeData:null,
            // vasRegions: [{name:"万网优车——智能管理平台",parentname:'万网优车',hidden:"0",system:"C",id:0,children:[]}],//树数据
            vasRegions:[],
	defaultProps: {
		label: 'name',
		children: 'children'
	},
            emptyText:"加载中~~~",
            editFormVisible: false,//编辑界面是否显示
	editLoading: false,
	editFormRules: {
	},
	//编辑界面数据
	editForm: {
		id:'',
		name:'',
		parentid:'',
		reskey:'',
		resurl:'',
		icon:'',
		reslevel:'',
		rpturl:'',
		description:'',
		hidden:'',
		restype:'1',
		system:'C',
	},
	addFormVisible: false,//新增界面是否显示
	addLoading: false,
	addFormRules: {
	},
	//新增界面数据
	addForm: {
		id:'',
		name:'',
		parentid:'',
		parentname:'',
		reskey:'',
		resurl:'',
		icon:'',
		reslevel:'',
		rpturl:'',
		description:'',
		hidden:'0',
		restype:'1',
		system:'C',
	},
      };
    },
    methods: {
	      filterNode(value, data) {
	        if (!value || !data.name) return true;
	        return data.name.indexOf(value) !== -1;
	      },
	      append(store, treeData) {
	      	console.log(treeData)
	      	this.addFormVisible = true;
	      	this.addForm = {
				name:'',
				parentid:'',
				parentname:'',
				resurl:'',
				hidden:'0',
				system:treeData.system,
				icon:'',
				description:'',
				reskey:'',
				reslevel:'',
				rpturl:'',
				restype:'1',
			}
		// 新增子菜单时父级信息
	      	this.addForm.parentid = treeData.id;
	      	this.addForm.parentname = treeData.name;
	      	this.store = store;
	      	this.treeData = treeData;
	      },
	      edit:function(store, treeData){
			this.editFormVisible = true;

			this.editForm.id = treeData.id;
			this.editForm.name = treeData.name;
			this.editForm.parentid = treeData.parentid;
			this.editForm.parentname = treeData.parentname,
			this.editForm.description = treeData.description,
			this.editForm.icon = treeData.icon;
			this.editForm.resurl = treeData.resurl;
			this.editForm.system = treeData.system;
			this.editForm.reskey = treeData.reskey,
			this.editForm.reslevel = treeData.reslevel,
			this.editForm.rpturl = treeData.rpturl,
			this.editForm.restype = 1;
			this.editForm.hidden = ((treeData.hidden == 0 || !treeData.hidden) ? '0':'1');
	      		this.store = store;
	      		this.treeData = treeData;
	      },
	      remove(store, data) {
	        	this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
		}).then(() => {
			this.listLoading = true;
			let para = { 
				id: data.id
			};
			removeMenu(para).then((res) => {
				this.listLoading = false;
				if(res.data.result.code == 0){
					this.$message ({
						message : '删除成功',
						type: 'success'
					});
					store.remove(data);
				}
			});
		}).catch(() => {});
 	},
   		//编辑
	editSubmit: function () {
		this.$refs.editForm.validate((valid) => {
			if (valid) {
				this.editLoading = true;
				let para = Object.assign({}, this.editForm);
				modifyMenu(para).then((res) => {
					this.editLoading = false;
					if(res.data.result.code == 0){
						this.$message ({
							message : '编辑菜单成功',
							type: 'success'
						});
						this.$refs['editForm'].resetFields();
						this.editFormVisible = false;
						this.initVasRoles();
					}
					
				});
			}
		});
	},
	//新增
	addSubmit: function () {
		this.$refs.addForm.validate((valid) => {
			if (valid) {
				this.addLoading = true;
				let para = {
					name:this.addForm.name,
					parentid:this.addForm.parentid,
					resurl:this.addForm.resurl,
					system:this.addForm.system,
					icon:this.addForm.icon,
					description:this.addForm.description,
					reskey:this.addForm.reskey,
					reslevel:this.addForm.reslevel,
					rpturl:this.addForm.rpturl,
					hidden:this.addForm.hidden,
					restype:1,
				};
				addMenu(para).then((res) => {
					this.addLoading = false;
					if(res.data.result.code == 0){
						this.$message ({
							message : '新增菜单成功',
							type: 'success'
						});
						this.$refs['addForm'].resetFields();
						this.addFormVisible = false;
						this.initVasRoles();
					}
				});
			}
		});
	},
  	renderContent(h, { node, data, store }) {
  		console.log(data)
	      if(data.hidden == 1 && data.restype == 1 && !data.name) store.remove(data);
	      if(!data.name && !data.children[0]) return;
	       return (
	          <span>
	            <span>
	              <span>{!data.name ? data.children[0].name : data.name}</span>
	            </span>
	            {data.hidden == 1 ? <el-tag style="margin-left:10px;" size="mini" type="danger">未显示</el-tag>:''}
	            <span style="float: right; margin-right: 20px">
	              <el-button size="mini" on-click={ (e) => {this.append(store, data);e.stopPropagation();} }>新增子菜单</el-button>
	              <el-button size="mini" on-click={ (e) => {this.edit(store, data);e.stopPropagation();} }>编辑</el-button>
	              <el-button size="mini" on-click={ (e) => {this.remove(store, data);e.stopPropagation();} }>删除</el-button>
	            </span>
	          </span>);
  		},
	// 加载树的数据
  		initVasRoles:function(){
			let para = {
				parentid : 0,
				system:"C"
			};
			this.emptyText = "加载中~~~";
			//初始化所有父节点树
			getMenuList(para).then((res) => {
				this.vasRegions = res.data.data.records;
				this.emptyText = "完成";
			});
      		},
    },
    
    created:function(){
    	this.initVasRoles();
    }
  };
</script>