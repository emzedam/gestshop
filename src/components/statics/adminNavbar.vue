<template>

<nav
            class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
          >
            <!-- Sidebar Toggle (Topbar) -->
            <button
              id="sidebarToggleTop"
              class="btn btn-link d-md-none rounded-circle mr-3"
            >
              <i class="fa fa-bars"></i>
            </button>

            <!-- Topbar Search -->

            <!-- Topbar Navbar -->
            <ul class="navbar-nav mr-auto">
              <!-- Nav Item - Search Dropdown (Visible Only XS) -->
              <li class="nav-item dropdown no-arrow d-sm-none">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="searchDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-search fa-fw"></i>
                </a>
                <!-- Dropdown - Messages -->
                <div
                  class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                  aria-labelledby="searchDropdown"
                >
                  <form class="form-inline mr-auto w-100 navbar-search">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control bg-light border-0 small"
                        placeholder="جستجو کنید"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                      />
                    </div>
                  </form>
                </div>
              </li>

             

  

              <div class="topbar-divider d-none d-sm-block"></div>

              <!-- Nav Item - User Information -->
              <li class="nav-item dropdown no-arrow">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  v-if="authuser != null"
                >
                  <span class="ml-2 d-none d-lg-inline text-gray-600 small">{{
                    authuser.name
                  }}</span>
                  <img
                    class="img-profile rounded-circle"
                    src="@/assets/images/undraw_profile.svg"
                  />
                </a>
                <!-- Dropdown - User Information -->
                <div
                  class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="userDropdown"
                >
                  <div class="dropdown-divider"></div>
                  <a
                    @click="do_logout_admin()"
                    class="dropdown-item"
                    href="javascript:void(0)"
                    data-toggle="modal"
                    data-target="#logoutModal"
                  >
                    <i
                      class="fas fa-sign-out-alt fa-sm fa-fw ml-2text-gray-400"
                    ></i>
                    خروج از حساب
                  </a>
                </div>
              </li>
            </ul>
          </nav>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useCookies } from "vue3-cookies";
import {useRouter} from 'vue-router'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const router = useRouter()
const $toast = useToast()
const { cookies } = useCookies();
const store = useStore();

const authuser = computed(() => {
  return store.getters.get_authadmin;
});

const do_logout_admin = async () => {
  if (cookies.get("AToken") != null) {
    if (confirm("آیا از خروج خود مطمعن هستید ؟")) {
      const doLogout = await store.dispatch(
        "do_admin_logout",
        cookies.get("AToken")
      );
      if (doLogout.statusCode == 200) {
        cookies.remove("AToken", { path: "/" });

        $toast.success(doLogout.statusMessage, {
          position: "top-left",
        });
        router.push("/");
      } else {
        $toast.error("خطایی رخ داده", {
          position: "top-left",
        });
        router.push("/");
      }
    }
  }
};
</script>

<style scoped>
@import url("../../assets/css/sb-admin-2.min.css");
</style>