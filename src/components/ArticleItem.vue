<template>
  <div class="item-container">
    <a href="#"
      ><img
        src="https://images.chinatimes.com/newsphoto/2020-07-01/656/20200701004939.jpg"
    /></a>
    <div class="item-content">
      <h3>新的一天就心得文章開始吧!</h3>
      <p>
        新的一天就心得文章開始吧!新的一天就心得文章開始吧!新的一天就心得文章開始吧!
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.item-container {
  position: relative;
  display: inline-flex;
  margin-top: 5px;
  margin-left: 15px;
  img {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 100px;
  }
  .item-content {
    margin-left: 10px;
    h3 {
      font-size: 15px;
    }
    p {
      font-size: 10px;
    }
  }
}
</style>
