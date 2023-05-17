<!-- @format -->

<template>

  <ContentField>
    <table class="table table-striped table-hover">
    <thead>
    <tr>
      <th>文章名</th>
      <th>作者</th>
      <th>日期</th>
    </tr>
    </thead>

      <tbody>
      <tr v-for="article in articles" :key="article.id">
        <td><a class="article-name" :href="article.id"  >{{article.article_name}}</a></td>
        <td>
          <img :src="article.article_photo" alt="" class="user-user-photo"/>
          &nbsp;
          <span class="user-user-username">{{article.article_author}}</span>
        </td>
        <td>
          {{article.article_createtime}}
        </td>
      </tr>
      </tbody>

  </table>
    <nav aria-label="...">
      <ul class="pagination" style="float:right;">
        <li class="page-item">
          <a class="page-link" @click="click_page(-2)">前一页</a>
        </li>
        <li :class="'page-item ' + page.is_active" v-for="page in pages" :key="page.number" @click="click_page(page.number)">
          <a class="page-link" href="#">{{page.number}}</a>
        </li>
        <li class="page-item">
          <a class="page-link" @click="click_page(-1)">后一页</a>
        </li>
      </ul>
    </nav>
  </ContentField>

  <font-awesome-icon
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#add-article-btn"
      class="firstPage-icon"
      icon="fa-solid fa-square-plus" />

  <!-- Modal -->
  <div class="modal fade" id="add-article-btn" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">发布文章</h5>
          <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="add-article-title" class="col-form-label"
              >文章名</label
              >
              <input
                  v-model="article_title"
                  type="text"
                  class="form-control"
                  id="add-article-title"
                  placeholder="请输入文章名称"
              />
            </div>
            <div class="mb-3">
              <label
                  for="add-article-content"
                  class="col-form-label"
              >文章内容</label
              >
              <v-md-editor v-model="article_content" id="add-article-content" height="400px"></v-md-editor>
            </div>

          </form>
        </div>
        <div class="modal-footer">
          <button
              type="button"
              class="btn btn-primary"
              @click="submit_article"
          >
            创建
          </button>
          <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import ContentField from "@/components/ContentField.vue";
import {ref} from "vue";
import axios from "@/utils/axios";
import {useStore} from "vuex";
import { Modal } from "bootstrap/dist/js/bootstrap";

export default {
  components: {
    ContentField,
  },
  setup() {

    library.add(faSquarePlus);

    const store = useStore();

    let articles = ref([]);
    let current_page = 1;
    let total_articles = 0;
    let pages = ref([]);
    let article_title = ref('');
    let article_content = ref('');

    const click_page = page => {
      if(page === -2) page = current_page - 1;
      else if(page === -1) page = current_page + 1;
      let max_pages = parseInt(Math.ceil(total_articles / 10));
      if(page >= 1 && page <= max_pages) {
        pull_page(page);
      }
    }

    const update_pages = () => {
      let max_pages = parseInt(Math.ceil(total_articles / 10));
      let new_pages = [];
      for(let i = current_page - 2 ; i <= current_page + 2 ; i ++ ) {
        if(i >= 1 && i <= max_pages) {
          new_pages.push({
            number: i,
            is_active: i === current_page ? "active" : "",
          });
        }
      }
      pages.value = new_pages;
    }

    const pull_page = page => {
      current_page = page;
      axios.get('/article/getArticle/', {
        params: {
          page
        }
      }).then(resp => {
        articles.value = resp.articles ;
        total_articles  = resp.articles_count;
        update_pages();
      }).catch(resp => {
        console.error(resp);
      });
    };

    const submit_article = () => {
      axios.post("/article/addArticle/", {
        articleName: article_title.value,
        articleContent: article_content.value,
        userId: store.state.user.id,
      }).then(resp => {
        Modal.getInstance("#add-article-btn").hide();
        pull_page(current_page);
      }).catch(resp => {
        alert(resp);
      });
    }



    pull_page(current_page);

    return {
      articles,
      pages,
      click_page,
      article_title,
      article_content,
      submit_article
    };
  }
}
</script>

<style scoped>

a.article-name {
  color:cornflowerblue;
  text-decoration: none;
}

a.article-name:hover {
  text-decoration: underline;
}

img.user-user-photo {
  width:4vh;
  border-radius: 50%;
}

.page-link {
  cursor:pointer;
}

.firstPage-icon {
  width:7vh;
  height: 7vh;
  position: absolute;
  right:10vh;
  top:20vh;
}

</style>
