import {create, login, signup} from '@/api/user.js';
export default {
  components: {},
  data () {
    return {
      rememberPW: false,
      BASE_API: process.env.BASE_API,
      imgR: process.env.imgR,
      formInline: {
        user: '',
        password: '',
        repeatpass: '',
        avator: null
      },
      ruleInline: {
        user: [
          {required: true, message: '请填写用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请填写用密码', trigger: 'blur'},
          {type: 'string', min: 6, message: '密码最少6位~~', trigger: 'blur'}
        ],
        repeatpass: [
          {required: true, message: '请再次填写密码', trigger: 'blur'}
        ],
        avator: [
          {required: true, message: '请上传一个图像', trigger: 'blur'}
        ],
      },
      loading: false,
      imgR: process.env.imgR,

      defaultList: [],
      imgName: '',
      visible: false,
      uploadList: []

    };
  },
  methods: {
    handleSubmit(name){
      if (this.formInline.password != this.formInline.repeatpass) {
        this.$Message.error(
          '两次输入的密码不一致'
        );
        return;
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          signup({
            username: this.formInline.user,
            password: this.formInline.password
          },).then(res => {
            if (res) {
              if (res.status == 0) {
                this.$Message.success('注册成功啦~');
                setTimeout(() => {
                  this.$router.push({
                    path: '/login'
                  });
                }, 500);
              } else if (res.status == 1) {
                this.$Message.info(res.msg);
              }
            }
          });
        } else {

        }
      });

    },

    handleRemove (file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      this.formInline.avator = null;
    },
    handleSuccess (res, file) {
      console.log(res);
      file.url = res.url;
      file.name = 'logo';
      this.formInline.avator = res.url;
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '一个错误的文件类型',
        desc: file.name + ' is incorrect, please select jpg or png.'
      });
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      });
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: '您已选择了一个图像'
        });
      }
      return check;
    }
  },
  mounted(){
    this.uploadList = this.$refs.upload.fileList;


  },
  created(){


  },

};


