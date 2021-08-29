<template>
  <div>
    <div class="row">
      <div class="col-3">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            checked
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Tất cả
          </label>
        </div>
      </div>
      <div class="col-3">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"

          />
          <label class="form-check-label" for="flexRadioDefault2">
            Đã hoàn thành
          </label>
        </div>
      </div>
      <div class="col-3">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Chưa hoàn thành
          </label>
        </div>
      </div>
      <div class="col-3">
        <!-- componentThemCongViec -->
        <component-them-cong-viec />
      </div>
    </div>
  </div>
</template>

<script>
import componentThemCongViec from "./componentThemCongViec.vue";

export default {
  components: {
    componentThemCongViec,
  },
};
</script>

<style scoped>
</style>