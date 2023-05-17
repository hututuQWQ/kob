<!-- @format -->

<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-3">
          <div class="card" style="margin-top: 20px">
            <div class="card-body">
              <img :src="$store.state.user.photo" alt="" />
            </div>
          </div>
        </div>
        <div class="col-9">
          <div class="card" style="margin-top: 20px">
            <div class="card-header">
              <span style="font-size: 120%">个人信息 </span>

            </div>
            <div class="card-body col-9 mx-auto">

              <div class="input-group">
                <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                <button  class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Button</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {

};
</script>

<style scoped>

</style>
