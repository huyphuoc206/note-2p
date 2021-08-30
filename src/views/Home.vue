<template>
  <div class="home">
    <Header />
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
            <Search />
            <ToggleFilter />
            <button
              class="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#createCategory"
            >
              <i class="fas fa-plus me-3"></i>Tạo danh mục
            </button>
          </div>
          <table class="table align-middle bg-white">
            <thead>
              <tr class="fs-5">
                <th scope="col" class="text-center">#</th>
                <th scope="col" class="text-center">Danh mục</th>
                <th scope="col" class="text-center">Ngày tạo</th>
                <th scope="col" class="text-center">Tiến độ</th>
                <th scope="col" class="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-center">1</td>
                <td>Mua sắm</td>
                <td class="text-center">2/2/2021</td>
                <td class="text-center vertical">
                  <div class="progress">
                    <div
                      class="progress-bar progress-bar-striped bg-success"
                      role="progressbar"
                      style="width: 25%"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      25%
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  <button
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
                    data-bs-toggle="modal"
                    data-bs-target="#removeModal"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  <!-- Modal remove-->

  <div
    class="modal fade"
    id="removeModal"
    tabindex="-1"
    aria-labelledby="removeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Xóa danh mục <strong>ABCXYZ</strong></h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p class="text-danger">
            <strong>Lưu ý: </strong>
            <i>Danh mục công việc này sẽ bị xóa vĩnh viễn.</i>
          </p>
          <p>Bạn chắc chắn muốn xóa?</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Quay lại
          </button>
          <button type="button" class="btn btn-danger">Xóa</button>
        </div>
      </div>
    </div>
  </div>
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
          <Category title="Hello" />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Quay lại
          </button>
          <button type="button" class="btn btn-success">Thêm</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal create category -->
  <div
    class="modal fade"
    id="createCategory"
    tabindex="-1"
    aria-labelledby="createCategory"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <Category :isCreate="true" />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Quay lại
          </button>
          <button type="button" class="btn btn-success">Thêm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TokenStorage from "../jwt/token-storage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ToggleFilter from "../components/ToggleFilter";
import Search from "../components/Search";
import Category from "../components/Category";
import Task from "../components/Task";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
    ToggleFilter,
    Search,
    Category,
    Task,
  },
  data() {
    return {};
  },
  created() {
    const token = TokenStorage.ACCESS_TOKEN;
    if (token === undefined || TokenStorage.isExpired(token)) {
      this.$router.push({ name: "Login" });
    }
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
</style>
