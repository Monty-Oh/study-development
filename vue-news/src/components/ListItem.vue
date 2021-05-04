<template>
  <ul class="item-list">
    <li v-for="(item, index) in currentList" :key="index" class="post">
      <div class="points">
        {{ item.points }}
      </div>
      <div>
        <!-- 분기 -->
        <p v-if="currentUrl === 'news'" class="item-title">
          <a :href="item.url">
            {{ item.title }}
          </a>
        </p>
        <p v-else-if="currentUrl === 'ask'" class="item-title">
          <router-link :to="`/item/${item.id}`">
            {{ item.title }}
          </router-link>
        </p>
        <!-- 분기 끝 -->
        <small class="link-text">
          {{ item.time_ago }} by
          <router-link :to="`/user/${item.user}`" class="link-text">
            {{ item.user }}
          </router-link>
        </small>
      </div>
    </li>
  </ul>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  created() {
    if (this.$route.name === 'news')
      this.$store.dispatch({
        type: 'FETCH_STATE',
        menu: 'news',
      });
    else if (this.$route.name === 'ask')
      this.$store.dispatch({
        type: 'FETCH_STATE',
        menu: 'ask',
      });
  },

  computed: {
    ...mapGetters([
      'fetchedNews',
      'fetchedAsk',
    ]),
    currentList() {
      return this.$route.name === 'news' ? this.fetchedNews : this.fetchedAsk
    },
    currentUrl() {
      return this.$route.name;
    }
  }
}
</script>

<style scoped>
.item-list {
  margin: 0;
  padding: 0;
}

.post {
  list-style: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.points {
  width: 80px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42b883;
}

.item-title {
  margin: 0;
}

.link-text {
  color: #828282
}
</style>