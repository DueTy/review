<template>
  <div>
    <input type="file" @change="handleFileChange" multiple />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      file: {},
    };
  },
  methods: {
    async handleFileChange(e) {
      const files = e.target.files;
      const base64 = await this.file2BASE64(files[0]);

      axios({
        // withCredentials: true,
        url: "/rest/2.0/ocr/v1/accurate_basic?access_token=24.4a7d90fae381f96bcb2c08f9dbc17d00.2592000.1639813712.282335-25191089",
        method: "post",
        baseURL: "https://aip.baidubce.com",
        timeout: 100000,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          image: base64,
        },
      }).then((res) => {
        console.log(res);
      });
    },
    file2BASE64(file) {
      return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = (e) => {
          resolve(e.target.result);
        };
        fr.onerror = () => {
          reject({ msg: "出错了" });
        };
        fr.readAsDataURL(file);
      });
    },
  },
};
</script>