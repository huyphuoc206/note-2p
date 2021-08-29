<template>
<div>
<div class="card">
                  <div class="card-header p-3">
                    <h5 class="mb-0">
                      <i class="fas fa-tasks me-2"></i>Danh sách công việc
                    </h5>
                  </div>
                  <div
                    class="card-body"
                    data-mdb-perfect-scrollbar="true"
                    style="position: relative; height: 400px"
                  >
                    <table class="table mb-0">
                      <thead>
                        <tr class="fs-4">
                          <th scope="col">STT</th>
                          <th scope="col">Tên công việc</th>
                          <th scope="col">Ngày tạo</th>
                          <th scope="col">Tiến độ</th>
                          <th scope="col">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="fs-5">
                          <th>
                            <span class="ms-2">stt</span>
                          </th>
                          <td class="align-middle">
                            <span>ten</span>
                          </td>
                          <td class="align-middle">
                            <h6 class="mb-0"><span>ngày tạo</span></h6>
                          </td>
                          <td>
                            <!-- tiến độ -->
                            <div class="progress">
                              <div
                                class="
                                  progress-bar progress-bar-striped
                                  bg-success
                                "
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
                          <td class="align-middle">
                            <a href="#!" data-mdb-toggle="tooltip" title="Done" data-bs-toggle="modal" data-bs-target="#exampleModal"
                              ><i class="far fa-edit"></i></a
                            >
                            &nbsp;
                            <a
                              href="#!"
                              data-mdb-toggle="tooltip"
                              title="Remove"
                              ><i class="fas fa-trash-alt text-danger"></i
                            ></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
</div>
</template>

<script>

export default {
  components: {
  },
};
</script>

<style scoped>
</style>