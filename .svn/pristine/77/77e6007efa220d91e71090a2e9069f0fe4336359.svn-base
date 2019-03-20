<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div>
                <Form 
                    ref="userForm"
                    :model="userForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >
                    <FormItem label="用户账号：" prop="admin">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.admin" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="用户姓名：" prop="name">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.name" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="用户手机：" prop="cellphone" >
                        <div style="display:inline-block;width:204px;">
                            <Input v-model="userForm.cellphone" @on-keydown="hasChangePhone"></Input>
                        </div>
                        <div style="display:inline-block;position:relative;">
                            <Button @click="getIdentifyCode" :disabled="canGetIdentifyCode">{{ gettingIdentifyCodeBtnContent }}</Button>
                            <div class="own-space-input-identifycode-con" v-if="inputCodeVisible">
                                <div style="background-color:white;z-index:110;margin:10px;">
                                    <Input v-model="securityCode" placeholder="请填写短信验证码" ></Input>
                                    <div style="margin-top:10px;text-align:right">
                                        <Button type="ghost" @click="cancelInputCodeBox">取消</Button>
                                        <Button type="primary" @click="submitCode" :loading="checkIdentifyCodeLoading">确定</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FormItem>
                    <FormItem label="公司：">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.company" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="部门：">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.department" ></Input>
                        </div>
                    </FormItem>
                    <div>
                        <Button type="text" style="width: 100px;" @click="cancelEditUserInfor">取消</Button>
                        <Button type="primary" style="width: 100px;" :loading="save_loading" @click="saveEdit">保存</Button>
                    </div>
                </Form>
            </div>
        </Card>
    </div>
</template>

<script>
import { getNumber,checkNumber} from '../../api/api';

export default {
    name: 'own-space',
    data () {
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };
        return {
            userEmp:[],//员工
            userForm: {
                admin:'',
                name: '',
                cellphone: '',
                company: '',
                department: ''
            },
            uid: '',  // 登录用户的userId
            securityCode: '',  // 验证码
            phoneHasChanged: false,  // 是否编辑了手机
            save_loading: false,
            identifyError: '',  // 验证码错误
            editPasswordModal: false, // 修改密码模态框显示
            savePassLoading: false,
            oldPassError: '',
            identifyCodeRight: false,  // 验证码是否正确
            hasGetIdentifyCode: false,  // 是否点了获取验证码
            canGetIdentifyCode: false,  // 是否可点获取验证码
            checkIdentifyCodeLoading: false,
            inforValidate: {
                admin: [
                    { required: true, message: '请输入登陆账号', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                cellphone: [
                    { required: true, message: '请输入手机号码' },
                    { validator: validePhone }
                ]
            },
            inputCodeVisible: false, // 显示填写验证码box
            initPhone: '',
            gettingIdentifyCodeBtnContent: '获取验证码'  // “获取验证码”按钮的文字
        };
    },
    methods: {
        // 获取当前登录用户信息
        init () {
            this.userEmp = JSON.parse(sessionStorage.getItem('user')).employeeInfo;//存储员工信息

            this.userForm.admin = this.userEmp.employeecode;
            this.userForm.name = this.userEmp.employeename;
            this.userForm.cellphone = this.userEmp.mobile;
            this.initPhone = this.userEmp.mobile;
            this.userForm.company = this.userEmp.corpid;
            this.userForm.department = this.userEmp.deptid;
        },
        // 获取验证码按钮
        getIdentifyCode () {
            this.hasGetIdentifyCode = true;
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    this.canGetIdentifyCode = true;
                    let timeLast = 60;
                    let timer = setInterval(() => {
                        if (timeLast >= 0) {
                            this.gettingIdentifyCodeBtnContent = timeLast + '秒后重试';
                            timeLast -= 1;
                        } else {
                            clearInterval(timer);
                            this.gettingIdentifyCodeBtnContent = '获取验证码';
                            this.canGetIdentifyCode = false;
                        }
                    }, 1000);
                    this.inputCodeVisible = true;
                    
                    let para = {
                      mobile:this.userForm.cellphone,
                    }
                    getNumber(para).then((res)=>{
                      if (res.data.result.code == 0) {
                         this.$Message.success(res.data.data);          
                      }else{
                         this.$Message.error(res.data.result.desc);
                      }
                    });
                }
            });
        },
        // 取消输入验证码
        cancelInputCodeBox () {
            this.inputCodeVisible = false;
            this.userForm.cellphone = this.initPhone;
        },
        // 确认验证码
        submitCode () {
            let vm = this;
            vm.checkIdentifyCodeLoading = true;
            if (this.securityCode.length === 0) {
                this.$Message.error('请填写短信验证码');
            } else {
                setTimeout(() => {
                    let para = {
                        mobile:this.userForm.cellphone,
                        number:this.securityCode
                    }
                    checkNumber(para).then((res)=>{
                        if(res.data.result.code == 0){
                            this.inputCodeVisible = false;
                            this.checkIdentifyCodeLoading = false;
                            this.$Message.success('验证码正确');
                        }else{
                           this.$Message.error(res.data.result.desc);
                        }
                    });
                }, 1000);
            }
        },
        // 取消修改
        cancelEditUserInfor () {
            this.$store.commit('removeTag', 'ownspace_index');
            localStorage.pageOpenedList = JSON.stringify(this.$store.state.pageOpenedList);
            let lastPageName = '';
            if (this.$store.state.pageOpenedList.length > 1) {
                lastPageName = this.$store.state.pageOpenedList[1].name;
            } else {
                lastPageName = this.$store.state.pageOpenedList[0].name;
            }
            this.$router.push({
                name: lastPageName
            });
        },
        // 保存修改
        saveEdit () {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    if (this.phoneHasChanged && this.userForm.cellphone !== this.initPhone) {  // 手机号码修改过了而且修改之后的手机号和原来的不一样
                        if (this.hasGetIdentifyCode) { // 判断是否点了获取验证码
                            if (this.identifyCodeRight) {  // 判断验证码是否正确
                                this.saveInfoAjax();
                            } else {
                                this.$Message.error('验证码错误，请重新输入');
                            }
                        } else {
                            this.$Message.warning('请先点击获取验证码');
                        }
                    } else {
                        this.saveInfoAjax();
                    }
                }
            });
        },
        // 手机号改变
        hasChangePhone () {
            this.phoneHasChanged = true;
            this.hasGetIdentifyCode = false;
            this.identifyCodeRight = false;
        },
        // 保存成功
        saveInfoAjax () {
            this.save_loading = true;
            setTimeout(() => {
                this.$Message.error('修改个人信息功能暂未开放！');
                // this.$Message.success('保存成功');
                this.save_loading = false;
            }, 1000);
        }
    },
    mounted () {
        this.init();
    }
};
</script>
