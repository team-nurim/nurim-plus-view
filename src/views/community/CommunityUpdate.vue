<template>
    <div class="register-container">
        <!-- 제목, 카테고리 입력 필드 -->
        <div class="form-group">
            <div class="col-md-1">
                <select id="categorySelect" class="form-select" name="category" style="margin-left: 175px;" v-model="communityData.category">
                    <option disabled value="">카테고리</option>
                    <option disabled value="보육">보육</option>
                    <option disabled value="출산">출산</option>
                    <option disabled value="주거">주거</option>
                    <option disabled value="장례">장례</option>
                </select>
            </div>
            <label for="titleInput">제목</label>
            <input v-model="communityData.title" type="text" class="form-control" id="titleInput" placeholder="수정할 제목을 입력하세요" style="width: 1000px; margin-left: auto; margin-right: auto;">
            <span v-if="!communityData.title" style="color: red; margin-left: 10px;">제목을 입력해주세요.</span>
        </div>

        <!-- 내용 입력 필드 -->
        <div class="form-group">
            <label for="contentInput">내용</label>
            <textarea class="form-control" id="contentInput" v-model="communityData.content" rows="5" placeholder="수정할 내용을 입력하세요" style="width: 1000px; height: 500px; margin-left: auto; margin-right: auto;"></textarea>
            <span v-if="!communityData.content" style="color: red; margin-left: 10px;">내용을 입력해주세요.</span>
        </div>
        <!-- 이미지 필드 -->
        <div v-for="(image, index) in images" :key="index">
        <img :src="image" alt="Community Image">
    </div>
        <!-- 취소하기 및 등록하기 버튼 -->
        <div class="row" style="margin-top: 20px;">
            <div class="col">
                <button class="btn btn-secondary" @click="cancel">취소하기</button>
            </div>
            <div class="col">
                <button class="btn btn-primary" @click="modifyCommunity">등록하기</button>
            </div>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import axios from 'axios';
export default {
    name: 'CommunityUpdate',
    props: ['communityId','communityImages'],

    data() {
        return {
            communityData: {
                title: '',
                content: '',
                category: '',
                images: this.communityImages,
            }
        }
    },

    mounted() {
        this.axiosCommunityData();
    },

    methods: {
        async axiosCommunityData() {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get(`http://localhost:8080/api/v1/communityRead/${this.communityId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const community = response.data;

                this.communityData.title = community.title;
                this.communityData.content = community.content;
                this.communityData.category = community.category;
                this.communityData.communityImages = community.communityImages;
            } catch (error) {
                console.error('게시물 정보를 불러올 수 없습니다:', error);
            }
        },
        async modifyCommunity() {
            try {
                const formData = new FormData();
                formData.append('title', this.communityData.title);
                formData.append('content', this.communityData.content);
                formData.append('category', this.communityData.category);

                const accessToken = localStorage.getItem('accessToken');
                const url = `http://localhost:8080/api/v1/communityUpdate/${this.communityId}/${accessToken}`;

                const response = await axios.put(url, formData, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                alert('게시물이 수정되었습니다.');
                this.$router.push({ name: 'CommunityDetailView', params: { communityId: this.communityId } });
            } catch (error) {
                console.error('게시물 수정 실패', error);
            }
        },
        cancel() {
            window.history.back()
        }
    }
}
</script>

<style>

</style>
