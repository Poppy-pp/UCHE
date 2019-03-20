<style lang="less">
    @import './login.less';
</style>

<template>
    <section class="login_simple_bac">
    <div class="login" @keydown.enter="handleSubmit">
        <div class="ltitle">
            <img src="../images/loginCar.png">
            <span>万网优车智能管理平台</span>
        </div>
        <div class="wrapper">
            <div class="container">
            <Card class="opacity">
                    <Tabs @on-click="tabClick" v-model="tabValue">
                        <!-- 企业员工登录 -->
                        <TabPane label="企业员工" icon="ios-people" name="R" v-if="companyEmp">
                            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline class="inputSize">
                                <FormItem prop="username" style="width:250px;">
                                        <Input size="large" type="text" v-model="formInline.username" placeholder="员工账号">
                                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                                        </Input>
                                    </FormItem>
                                    <FormItem prop="password" style="width:250px;">
                                        <Input size="large" type="password" v-model="formInline.password" placeholder="密码">
                                            <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                        </Input>
                                    </FormItem>
                                    <FormItem style="width:250px;">
                                        <Button class="login_button_zq" type="primary" @click="handleSubmit('formInline')">登录</Button>
                                    </FormItem>
                                    <div class="rememberpsw">
                                        <Checkbox  class="remember" v-model="checked">记住密码</Checkbox>
                                        <a class="flowPsw" href="javascript:void(0);" @click="forgetPwsSubmit">忘记密码</a>
                                        <a @click="adminCompany">企业管理</a>
                                    </div>
                                </Form>
                        </TabPane>
                        <!-- 个人车主登录 -->
                        <TabPane label="个人登陆" icon="android-person" name="" v-if="ownerEmp">
                            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline class="inputSize">
                                <FormItem prop="username" style="width:250px;">
                                        <Input size="large" type="text" v-model="formInline.username" placeholder="个人账号">
                                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                                        </Input>
                                    </FormItem>
                                    <FormItem prop="password" style="width:250px;">
                                        <Input size="large" type="password" v-model="formInline.password" placeholder="密码">
                                            <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                        </Input>
                                    </FormItem>
                                    <FormItem style="width:250px;">
                                        <Button  class="login_button_zq" type="primary" @click="handleSubmit('formInline')">登录</Button>
                                    </FormItem>
                                    <div class="rememberpsw">
                                        <Checkbox  class="remember" v-model="checked">记住密码</Checkbox>
                                        <a class="flowPsw" href="javascript:void(0);" @click="forgetPwsSubmit">忘记密码</a>
                                    </div>
                                </Form>
                        </TabPane>
                        <!-- 企业管理登录 -->
                        <TabPane label="企业管理" icon="android-car" name="C" v-if="companyAdmin">
                            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline class="inputSize">
                                <FormItem prop="username" style="width:250px;">
                                        <Input size="large" type="text" v-model="formInline.username" placeholder="账号">
                                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                                        </Input>
                                    </FormItem>
                                    <FormItem prop="password" style="width:250px;">
                                        <Input size="large" type="password" v-model="formInline.password" placeholder="密码">
                                            <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                        </Input>
                                    </FormItem>
                                    <FormItem style="width:250px;">
                                        <Button class="login_button_zq" type="primary" @click="handleSubmit('formInline')">登录</Button>
                                    </FormItem>
                                    <div class="rememberpsw">
                                        <Checkbox  class="remember" v-model="checked">记住密码</Checkbox>
                                        <a class="flowPsw" href="javascript:void(0);" @click="forgetPwsSubmit">忘记密码</a>
                                        <a @click="returnLogin">返回</a>
                                    </div>
                                </Form>
                        </TabPane>
                    </Tabs>
                     <Spin size="large" fix v-if="spinShow"></Spin>
                </Card>
            </div>
        </div>
    </div>

    <!-- 忘记用户密码 start-->
        <Modal
            v-model="editPswDialogVisible"
            title="忘记密码"
            @on-ok="editPswSubmit"
            @on-cancel="editPswDialogVisible = false"
            loading
            ok-text="确认修改"
            width="400"
            @close="forgetClose"
            class="modal">
            <Steps :current="stepsCurrent">
                <Step title="验证身份" icon="paper-airplane"></Step>
                <Step title="设置新密码" icon="ios-locked-outline"></Step>
                <Step title="完成" icon="checkmark-circled"></Step>
            </Steps>
            <Form :model="pswForm" :label-width="80" :rules="pswRules" ref="pswForm">
                <template v-if="stepsCurrent == 0">
                    <FormItem label="手机号" prop="mobile">
                        <Input v-model="pswForm.mobile" placeholder="请输入账号"></Input>
                    </FormItem>
                    <FormItem label="验证码" prop="number">
                        <Input v-model="pswForm.number" placeholder="请输入验证码">
                            <Button type="ghost" slot="append" @click="getCode">{{!isGetCode?'获取验证码':djTime+'秒'}}</Button>
                        </Input>
                    </FormItem>
                </template>
               <template v-if="stepsCurrent == 1">
                    <FormItem label="新密码" prop="password">
                        <Input v-model="pswForm.password" placeholder="请输入新密码"></Input>
                    </FormItem>
                    <FormItem label="确认密码" prop="passwordto">
                        <Input v-model="pswForm.passwordto" placeholder="请输入新密码"></Input>
                    </FormItem>
                    <FormItem label="账号类型" prop="usertype">
                        <RadioGroup v-model="pswForm.usertype" type="button">
                            <Radio label="C">企业</Radio>
                            <Radio label="R">员工</Radio>
                        </RadioGroup>
                    </FormItem>
               </template>
            </Form>
            <div slot="footer" class="dialog-footer">
                <Button type="primary" v-if="stepsCurrent == 0" @click="checkCode">下一步</Button>
                <Button type="primary" v-if="stepsCurrent == 1" @click="editPswSubmit">提交</Button>
                <Button @click.native="editPswDialogVisible = false">取消</Button>
            </div>
        </Modal>
        <!-- 忘记用户密码 end-->
</section>
</template>

<style type="text/css">
    .opacity{opacity: 0.8;}
    .inputSize .ivu-input-group-large .ivu-input, .ivu-input-group-large>.ivu-input-group-append, .ivu-input-group-large>.ivu-input-group-prepend{font-size: 16px !important;}
    .inputSize button{width: 100%;font-size: 16px;}
</style>

<script>
import Cookies from 'js-cookie';
import axios from 'axios';
import Qs from 'qs';
import { getNumber,checkNumber} from '../api/api';

export default {
    data () {
        return {
            formInline: {
                    username: '',
                    password: '',
                    //登陆成功后返回token
                    remember_me:true,
                    type:''
            },
                ruleInline: {
                    username: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 3, message: '密码长度不能小于3位', trigger: 'blur' }
                    ]
            },
            checked:true,
            spinShow: false,
            editPswDialogVisible:false,
            editPswLoading:false,
            pswForm:{
                mobile:'',
                password:'',
                passwordto:'',
                number:'',
                usertype:'',
            },
            pswRules: {
              mobile: [
                { required: true, message: "请输入账号！", trigger: 'blur' },
              ],
              password: [
                { required: true, message: "请输入新密码！", trigger: 'blur' },
              ],
              passwordto: [
                { required: true, message: "请再次密码！", trigger: 'blur' },
              ],
              type:[
                { required: true, message: "请选择登陆端！", trigger: 'blur' },
              ],
            },
            stepsCurrent:0,//步骤
            isGetCode:false,
            djTime:60,
            tabValue:'R',//默认选中的tab页
            tabName:'R',//登陆类型，默认企业员工
            companyAdmin:false,//企业管理
            companyEmp:true,//企业员工
            ownerEmp:true,//个人
        };
    },
    methods: {
        // 企业管理
        adminCompany(){
            this.tabValue = 'C';//将企业管理tab选中
            this.tabClick('C');//调用点击tab触发方法
            this.companyAdmin = true;//显示企业管理
            this.companyEmp = false;//隐藏企业员工登陆
            this.ownerEmp = false;//隐藏个人登陆
        },
        // 返回企业登录页
        returnLogin(){
            this.$router.go(0);//刷新页面
        },
        // 下一步
        next(){
            this.stepsCurrent += 1;
        },
        // 点击切换登陆端时
          tabClick(name){
            this.tabName = name;//存储登陆的type
            console.log(this.tabName)
          },
          //用户登陆
          handleSubmit() {
                     this.spinShow = true;
                    this.formInline.type = this.tabName;
                    this.formInline.platform = 'Web';
                    axios.post('/vasms-uche/login',Qs.stringify(this.formInline))
                        .then((res)=>{
                            if (res.data.result.code != 0) {
                                this.$Message.error('登录失败！' + res.data.result.desc);
                                this.spinShow = false;
                            } else {
                               /**存储用户信息**/
                               sessionStorage.setItem('user', JSON.stringify(res.data.data));
                               
                                 /**请求对应用户的权限信息 并且存储导航树信息**/
                                 // axios.get(`/vasms-web/api/v1/sys/sysResourceInfo/currentResource`,{ headers: {token: res.data.data.token}}).then((res)=>{
                                 //    if(res.data){
                                 //        sessionStorage.setItem('routes', JSON.stringify(res.data.data));
                                 //        sessionStorage.setItem('formInline', JSON.stringify(this.formInline));
                                 //        sessionStorage.setItem('isPrompt', 1);
                                 //        sessionStorage.setItem('noMenu', this.noMenu);
                                        
                                this.spinShow = false;
                                // Cookies存储信息，路由根据存储信息判断
                                let showname = '';
                                if (res.data.data.employeeInfo == null ) {//存储公司信息
                                    showname = res.data.data.corporateInfo.corpname;
                                }else if (res.data.data.corporateInfo == null) {//存储员工信息
                                    showname = res.data.data.employeeInfo.employeename;
                                }
                                Cookies.set('user', showname);
                                Cookies.set('password', this.formInline.password);
                                this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                                if (this.formInline.username === 'iview_admin') {
                                    Cookies.set('access', 0);
                                } else {
                                    Cookies.set('access', 1);
                                }
                                this.$router.push({
                                    name: 'home_index'
                                });
                                /**记住密码时——localStorage存储用户信息**/
                                if(this.checked){//记住密码时
                                    let user = {
                                        name:this.formInline.username,
                                        psw:this.formInline.password,
                                        remember_me:this.checked,
                                        type:this.tabName
                                    };
                                    localStorage.setItem('rememberUser', JSON.stringify(user));
                                }else{//不记住密码时
                                    var user = JSON.parse(localStorage.getItem('rememberUser'));
                                    if(user != undefined) localStorage.removeItem('rememberUser');
                                }
                            }
                        }).catch((error) => {
                            this.spinShow = false;
                            this.$Message.error('登录失败！' + error);
                        });
           },
           /*打开忘记密码窗口*/
          forgetPwsSubmit:function(){
            this.editPswDialogVisible = true;
          },
          //获取手机验证码
          getCode(){
            if (this.pswForm.mobile == '') {//当未输手机号时
                this.$Message.error('请输入手机号！');
                return;
            }
            if(this.isGetCode) return;
            this.interval = setInterval(()=>{
                if(this.djTime == 0){
                    clearInterval(this.interval);
                    this.djTime = 60;
                    this.isGetCode = false;
                }else{
                    this.djTime--;
                }
            },1000);
            this.isGetCode = true;

            let para = {
              mobile:this.pswForm.mobile,
            }
            getNumber(para).then((res)=>{
              if (res.data.result.code == 0) {
                 this.$Message.success(res.data.data);          
              }else{
                 this.$Message.error(res.data.result.desc);
              }
            });
          },
          //检查验证码是否正确
          checkCode(){
              this.$refs.pswForm.validate((valid) => {
                if (valid) {
              this.editPswLoading = true;
              let para = {
                mobile:this.pswForm.mobile,
                number:this.pswForm.number
              }
              checkNumber(para).then((res)=>{
                this.editPswLoading = false;
                if(res.data.result.code == 0){
                  this.stepsCurrent = 1;
                }else{
                   this.$Message.error(res.data.result.desc);
                }
              });
            }
            });
          },
           /*忘记密码，密码重置*/
          editPswSubmit:function(){
            this.$refs.pswForm.validate((valid) => {
                  if (valid) {
                    this.editPswLoading = true;
                   axios.post('/vasms-uche/lostPassWord',Qs.stringify(this.pswForm)).then((res)=>{
                           this.editPswLoading = false;
                          if (res.data.result.code == 4001) {
                                 this.$Message.error('密码设置失败！' + res.data.result.desc);
                                return;
                            }
                            if (res.data.result.code == 5001) {
                                this.$Message.error('密码设置失败！' + res.data.result.desc);
                                return;
                            } else {
                                this.$Message.success('密码设置成功！' );
                                this.editPswDialogVisible = false;
                                this.forgetClose();
                           }
                        }).catch((error) => {
                            this.editPswLoading = false;
                            this.$Message.error('密码设置失败！' + error );
                        });
                    }
                });
          },
          //忘记密码窗口关闭 初始化步骤
          forgetClose(){
                this.pswForm = {
                        mobile:'',
                        password:'',
                        passwordto:'',
                        number:'',
                        usertype:'',
                };
                this.djTime = 60;
                this.isGetCode = false;
                this.editPswLoading = false;
                this.stepsCurrent = 1;
                if(this.interval) clearInterval(this.interval);
          },
    },
    mounted() {
            // 判断用户是否记住密码，页面显示默认账号信息
            let user = JSON.parse(localStorage.getItem('rememberUser'));//获取本地存储里面的数据
            if(user != undefined){//如果存在
                this.checked = user.remember_me;
                this.formInline = {
                  username: user.name,
                  password: user.psw,
                  remember_me:true,
                  type:user.type
                }
            }else{//如果不存在
                this.formInline = {
                  username: '',
                  password: '',
                  remember_me:true,
                  type:this.tabName
                }
            };
            //清除所有cookie
            var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
            if (keys) { 
                for (var i = keys.length; i--;) 
                document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString();
            }
    },
};
</script>

