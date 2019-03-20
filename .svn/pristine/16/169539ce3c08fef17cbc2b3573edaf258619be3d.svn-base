<style lang="less">
    @import './unlock.less';
</style>

<template>
    <transition name="show-unlock">
        <div class="unlock-body-con" v-if="showUnlock" @keydown.enter="handleUnlock">
            <div @click="handleClickAvator" class="unlock-avator-con" :style="{marginLeft: avatorLeft}">
                <!-- 头像显示 -->
                <template v-if="userCorp.length == 0"><!-- 当登陆员工端时 -->
                    <template v-if="userEmp.headiconpath == null || userEmp.headiconpath == undefined">
                        <img class="unlock-avator-img" src="../../images/pho.png" :title="userEmp.employeename" />
                    </template>
                    <template v-else>
                        <img class="unlock-avator-img" :src="'/img/'+ userEmp.headiconpath" :title="userEmp.employeename" /></img>
                    </template>
                </template>
                <template v-else><!-- 当登陆公司端时 -->
                    <template v-if="userCorp.businesslicensepic == null || userCorp.businesslicensepic == undefined">
                        <img class="unlock-avator-img" src="../../images/pho.png" :title="userCorp.corpname" />
                    </template>
                    <template v-else>
                        <img class="unlock-avator-img" :src="'/img/'+ userCorp.businesslicensepic" :title="userCorp.corpname" /></img>
                    </template>
                </template>
                <div  class="unlock-avator-cover">
                    <span><Icon type="unlocked" :size="30"></Icon></span>
                    <p>解锁</p>
                </div>
            </div>
            <div class="unlock-avator-under-back" :style="{marginLeft: avatorLeft}"></div>
            <div class="unlock-input-con">
                <div class="unlock-input-overflow-con">
                    <div class="unlock-overflow-body" :style="{right: inputLeft}">
                        <input ref="inputEle" v-model="password" class="unlock-input" type="password" placeholder="密码同登录密码" />
                        <button ref="unlockBtn" @mousedown="unlockMousedown" @mouseup="unlockMouseup" @click="handleUnlock" class="unlock-btn"><Icon color="white" type="key"></Icon></button>
                    </div>
                </div>
            </div>
            <div class="unlock-locking-tip-con">已锁定</div>
        </div>
    </transition>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    name: 'Unlock',
    data () {
        return {
            avatorLeft: '0px',
            inputLeft: '400px',
            password: '',
            user:[],//用户
            userEmp:[],//员工
            userCorp:[],//公司
        };
    },
    props: {
        showUnlock: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        handleClickAvator () {
            this.avatorLeft = '-180px';
            this.inputLeft = '0px';
            this.$refs.inputEle.focus();
        },
        handleUnlock () {
            if (Cookies.get('password') === this.password) {
                this.avatorLeft = '0px';
                this.inputLeft = '400px';
                this.password = '';
                this.$store.commit('unlock');
                this.$emit('on-unlock');
            } else {
                this.$Message.error('密码错误，解锁失败！');
            }
        },
        unlockMousedown () {
            this.$refs.unlockBtn.className = 'unlock-btn click-unlock-btn';
        },
        unlockMouseup () {
            this.$refs.unlockBtn.className = 'unlock-btn';
        }
    },
    mounted () {
            // 得到登陆的用户信息
            this.user = JSON.parse(sessionStorage.getItem('user'));
            if (this.user.employeeInfo == null) {
                this.userCorp = this.user.corporateInfo;//存储公司信息
                this.userType = 'C';//存储公司类型
            }else if (this.user.corporateInfo == null) {}{
                this.userEmp = this.user.employeeInfo;//存储员工信息
                this.userType = 'R';//存储员工信息
            }
    }
};
</script>
