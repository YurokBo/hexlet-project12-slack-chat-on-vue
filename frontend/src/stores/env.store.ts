import { defineStore } from "pinia";
import { Ref, ref } from "vue";

interface EnvStore {
  API_URL: Ref<string>;
}

export const useEnvStore = defineStore('EnvStore', (): EnvStore => {
  const API_URL = ref('/api/v1/');

  return {
    API_URL
  }
})
