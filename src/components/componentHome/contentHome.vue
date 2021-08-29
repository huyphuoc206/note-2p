<template>
  <div>
    <section class="vh-100">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col">
            <div
              class="card"
              id="list1"
              style="border-radius: 0.75rem; background-color: #eff1f2"
            >
              <div class="card-body py-4 px-4 px-md-5">
                <p class="h1 text-center mt-3 mb-4 pb-3 text-primary">
                  <i class="fas fa-check-square me-1"></i>
                  <u>Note-2p</u>
                </p>

                <hr class="my-4" />
                <!-- start search -->
                <div
                  class="justify-content-end align-items-center mb-4 pt-2 pb-3"
                >
                  <div class="row">
                    <div class="col-4">
                      <!-- componentSearch -->
                      <component-search />
                    </div>
                    <div class="col-8">
                      <!-- componentRadio -->
                      <component-radio />
                    </div>
                  </div>
                </div>

                <!-- componentTable -->
                <component-table />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import componentSearch from "./componentSearch.vue";
import componentRadio from "./componentRadio.vue";
import componentTable from "./componentTable.vue";

export default {
  components: {
    componentSearch,
    componentRadio,
    componentTable
  },
};
</script>

<style scoped>
#list1 .form-control {
  border-color: transparent;
}
#list1 .form-control:focus {
  border-color: transparent;
  box-shadow: none;
}
#list1 .select-input.form-control[readonly]:not([disabled]) {
  background-color: #fbfbfb;
}
</style>