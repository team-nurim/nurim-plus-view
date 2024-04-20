<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
<div>
  <h1>{{ title }}</h1><br>
  <input type="text" v-model="valueModel" /><br>
</div>
<hr>
<div>
  <table>
    <thead>
      <tr>
        <th>NO.</th>
        <th>Title</th>
        <th>Contents</th>
        <th>Writer</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="i" v-for="(product,i) in productList">
        <td>{{ product.id }}</td>
        <td>{{ product.title }}</td>
        <td>{{ product.contents }}</td>
        <td>{{ product.writer }}</td>
        <td>{{ product.date }}</td>
      </tr>
    </tbody>
  </table>
</div>
<hr>
<div>
  <h1 v-if="type == 'a'">A</h1>
  <h1 v-else-if="type == 'b'">B</h1>
  <h1 v-else>C</h1>
</div>
</template>
<script>
// eslint-disable-next-line
/* eslint-disable */
export default {
  data () {
    return {
      title: 'World',
      valueModel: 'South Korea',
      productList: [
        { 'id':'1', 'title':'제목', 'contents':'내용', 'writer':'글쓴이', 'date':'2024-04-12' },
      ],
      type: 'a'
    }
  }
}
</script>
<style scoped>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    align-content: center;
    width: 80%;
    margin: 0 auto; /* 가운데 정렬을 위해 margin 속성 추가 */
  }
  td, th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
  }
</style>