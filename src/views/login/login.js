import {create, login} from '@/api/user.js';
export default {
  components: {},
  data () {
    return {
      rememberPW: false,
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          {required: true, message: '请填写用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请填写密码', trigger: 'blur'},
          {type: 'string', min: 6, message: '您的密码太短了', trigger: 'blur'}
        ]
      },
      loading: false,
      imgR: process.env.imgR,
    };
  },
  methods: {
    handleSubmit(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          login({
            username: this.formInline.user,
            password: this.formInline.password,
          },).then(res => {
            if (res) {
              if (res.status == 0 && res.msg == '登录成功') {
                this.$Cookies.set('avator', res.data.avator);
                this.$Cookies.set('nickname', res.data.nickname);
                this.$Cookies.set('userId', res.data.id);
                this.$router.push({
                  path: '/home'
                });
              } else {
                this.$Message.error('用户名密码错误');
              }
            }
          });
        } else {

        }
      });

    },
  },
  mounted(){


  },
  created(){


  },

};


