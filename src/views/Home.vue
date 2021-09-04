<template>
  <div class="home">
    <Header @logOut="logOut" />
    <div class="container content mt-5 mb-5">
      <div class="card">
        <div class="card-header ms-0 me-0">
          <h1 class="text-center m-2 text-primary">
            <i class="fas fa-check-square me-3"></i>
            <span>Note 2P</span>
          </h1>
        </div>
        <div class="card-body">
          <div class="header mb-3">
            <Search :isClear="isClear" @search="search" />
            <ToggleFilter :state="state" @toggleState="toggleState" />
            <button
              class="btn btn-success"
              @click="
                showCreateCategory = true;
                isClear = !isClear;
              "
            >
              <i class="fas fa-plus me-3"></i>Tạo danh mục
            </button>
          </div>
          <div v-show="isSearching" class="mb-2">
            Đang tìm kiếm:
            <strong class="ms-2 fst-italic">{{ keyWord }}</strong>
          </div>
          <table class="table align-middle bg-white">
            <thead>
              <tr class="fs-5">
                <th scope="col" class="text-center">#</th>
                <th scope="col" class="text-center">Danh mục</th>
                <th scope="col" class="text-center">Ngày tạo</th>
                <th scope="col" class="text-center">Ngày chỉnh sửa</th>
                <th scope="col" class="text-center">Tiến độ</th>
                <th scope="col" class="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody
              v-if="categories.length == 0"
              class="text-center fst-italic text-secondary fs-5"
            >
              <tr>
                <td colspan="6">Không tồn tại danh mục.</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr v-for="(item, index) in categories" :key="item.id">
                <td class="text-center vertical">
                  {{ (page - 1) * limit + index + 1 }}
                </td>
                <td class="vertical">{{ item.title }}</td>
                <td class="text-center vertical">{{ item.createdAt }}</td>
                <td class="text-center vertical">{{ item.updatedAt }}</td>
                <td class="text-center vertical">
                  <div class="progress">
                    <div
                      class="progress-bar progress-bar-striped bg-secondary"
                      role="progressbar"
                      :style="{
                        width:
                          item.progress === 0 ? '100%' : item.progress + '%',
                      }"
                      :class="{ 'bg-success': item.progress !== 0 }"
                      :aria-valuenow="item.progress"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {{ item.progress }}%
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  <button
                    @click="loadDetails(item.id)"
                    class="btn text-primary fs-5 me-2"
                    title="Xem chi tiết"
                    data-bs-toggle="modal"
                    data-bs-target="#viewCategory"
                  >
                    <i class="fas fa-eye"></i>
                  </button>
                  <button
                    class="btn text-danger fs-5 ms-2"
                    title="Xóa danh mục"
                    @click="
                      selectedCategoryId = item.id;
                      selectedCategoryName = item.title;
                      showRemoveCategory = true;
                    "
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <pagination
            v-model="page"
            :records="records"
            :per-page="limit"
            @paginate="paging"
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
  <!-- Modal remove-->
  <transition v-show="showRemoveCategory" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="width: 400px">
          <div class="modal-header">
            <slot name="header">
              <p class="fs-4 mb-0">
                Xóa danh mục
                <strong class="text-primary">{{ selectedCategoryName }}</strong>
              </p>
            </slot>
          </div>
          <div class="modal-body m-0">
            <p class="text-danger">
              <strong>Lưu ý: </strong>
              <i>Danh mục công việc này sẽ bị xóa vĩnh viễn.</i>
            </p>
            <p class="mb-0">Bạn chắc chắn muốn xóa?</p>
          </div>
          <div class="modal-footer pb-0">
            <slot name="footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="showRemoveCategory = false"
              >
                Quay lại
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="removeCategory(selectedCategoryId)"
              >
                Xóa
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- Modal view category -->
  <div
    class="modal fade"
    id="viewCategory"
    tabindex="-1"
    aria-labelledby="viewCategory"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <Category
            :title="currentCategory.title"
            :tasks="currentCategory.tasks"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal create category -->
  <transition v-show="showCreateCategory" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <Category
            :isClear="isClear"
            :isCreate="true"
            @hiddenCreateCategory="showCreateCategory = false"
            @createCategory="createCategory"
          />
        </div>
      </div>
    </div>
  </transition>

  <transition v-show="showNotification" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container text-center" style="width: 400px">
          <p class="notification text-center fs-5">
            {{ notification }}
          </p>
          <button class="btn btn-primary" @click="showNotification = false">
            Quay lại
          </button>
        </div>
      </div>
    </div>
  </transition>

  <!-- Token expired => allow user back to login -->
  <transition v-show="showTokenExpired" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container text-center">
          <p class="notification text-center fs-5">
            Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.
          </p>
          <router-link to="/" class="btn btn-danger">Đăng nhập lại</router-link>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import TokenStorage from "../jwt/token-storage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ToggleFilter from "../components/ToggleFilter";
import Search from "../components/Search";
import Category from "../components/Category";
import Pagination from "v-pagination-3";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
    ToggleFilter,
    Search,
    Category,
    Pagination,
  },
  data() {
    return {
      intervalRefreshToken: null,
      showCreateCategory: false,
      showRemoveCategory: false,
      showNotification: false,
      showTokenExpired: false,
      notification: "",
      page: 1,
      limit: 5,
      records: 0,
      categories: [],
      selectedCategoryId: -1,
      selectedCategoryName: "",
      currentCategory: {},
      isSearching: false,
      keyWord: "",
      state: "ALL",
      isClear: false,
    };
  },

  methods: {
    async logOut() {
      const res = await fetch("api/logout");
      if (res.status === 200) {
        TokenStorage.ACCESS_TOKEN = undefined;
        clearInterval(this.intervalRefreshToken);
        this.$router.push({ name: "Login" });
      }
    },
    // run interval refresh token by access token life time
    async runIntervalRefresh() {
      const self = this;
      this.intervalRefreshToken = setInterval(async function () {
        const res = await fetch("api/token/refresh");
        if (res.status === 200) {
          const data = await res.json();
          TokenStorage.ACCESS_TOKEN = data.access_token;
        } else {
          TokenStorage.ACCESS_TOKEN = undefined;
          clearInterval(self.intervalRefreshToken);
          self.showTokenExpired = true;
        }
      }, TokenStorage.ACCESS_TOKEN_LIFE);
    },
    async loadCategories() {
      const token = TokenStorage.ACCESS_TOKEN;
      const userId = TokenStorage.getUserInfo(token).id;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let url = `api/users/${userId}/categories?page=${this.page}&limit=${this.limit}&state=${this.state}`;
      if (this.isSearching) url += `&search=${this.keyWord}`;
      const res = await fetch(url, {
        headers,
      });
      if (res.status === 200) {
        const data = await res.json();
        this.records = data.records;
        data.categories.map((e) => {
          let progress = 0;
          e.createdAt = new Date(e.createdAt).toLocaleString("en-IE");
          if (e.updatedAt !== null)
            e.updatedAt = new Date(e.updatedAt).toLocaleString("en-IE");
          if (
            e.allTasksIsDone !== null &&
            e.allTasks !== null &&
            e.allTasks !== 0
          ) {
            progress = Math.round((e.allTasksIsDone / e.allTasks) * 100);
          }
          e.progress = progress;

          return e;
        });
        return data.categories;
      }
    },
    async paging() {
      this.categories = await this.loadCategories();
    },
    async createCategory(category) {
      const header = {
        "Content-type": "application/json",
        Authorization: `Bearer ${TokenStorage.ACCESS_TOKEN}`,
      };
      const res = await fetch("api/categories", {
        method: "POST",
        headers: header,
        body: JSON.stringify(category),
      });
      if (res.status === 200) {
        this.notification = "Tạo danh mục thành công";
        this.page = 1;
        this.isSearching = false;
        this.state = "ALL";
        this.keyWord = "";
        this.isClear = !this.isClear;
        this.categories = await this.loadCategories();
      } else {
        this.notification = "Tạo danh mục thất bại";
      }
      this.showNotification = true;
      this.showCreateCategory = false;
    },
    async loadDetails(id) {
      const headers = {
        Authorization: `Bearer ${TokenStorage.ACCESS_TOKEN}`,
      };
      const res = await fetch(`api/categories/${id}`, {
        headers,
      });
      if (res.status === 200) {
        const data = await res.json();
        this.currentCategory = data;
      }
    },
    async removeCategory(id) {
      const header = {
        Authorization: `Bearer ${TokenStorage.ACCESS_TOKEN}`,
      };
      const res = await fetch(`api/categories/${id}`, {
        method: "DELETE",
        headers: header,
      });
      if (res.status === 200) {
        this.notification = "Xóa danh mục thành công";
        this.page = 1;
        this.categories = await this.loadCategories();
      } else {
        this.notification = "Xóa danh mục thất bại";
      }
      this.showNotification = true;
      this.showRemoveCategory = false;
    },
    async search(keyWord) {
      this.page = 1;
      if (keyWord.length === 0) {
        this.isSearching = false;
        this.state = "ALL";
      } else {
        this.isSearching = true;
      }
      this.keyWord = keyWord;
      this.categories = await this.loadCategories();
    },
    async toggleState(state) {
      this.page = 1;
      this.state = state;
      this.categories = await this.loadCategories();
    },
  },
  async created() {
    const token = TokenStorage.ACCESS_TOKEN;
    if (token === undefined) {
      this.$router.push({ name: "Login" });
      return;
    }
    await this.runIntervalRefresh();

    this.categories = await this.loadCategories();
  },
};
</script>

<style scoped>
.home {
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
}

.content {
  height: 100vh;
}

.content .card {
  border-radius: 0.75rem;
  background-color: #eff1f2;
}

.content .card-body .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

td .btn {
  padding: 0;
}

td .btn:focus,
td .btn:active {
  outline: none !important;
  box-shadow: none;
}

.modal-content {
  border-radius: 20px;
}

.modal-container {
  width: 500px;
}
</style>
