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
            <textarea class="form-control" id="contentInput" v-model="communityData.content" rows="5" placeholder="수정할 내용을 입력하세요" style="width: 1000px; height: 250px; margin-left: auto; margin-right: auto;"></textarea>
            <span v-if="!communityData.content" style="color: red; margin-left: 10px;">내용을 입력해주세요.</span>
        </div>
        
        <!-- 이미지 업로드를 위한 input 요소 추가 -->
        <label for="image" class="col-md-3 col-form-label">이미지 업로드</label>
        <div class="mb-3 row justify-content-center">
            <div class="col-md-9">
                <input type="file" class="form-control" id="image" accept="image/*" @change="handleImageUpload">
            </div>
        </div>

        <!-- 이미지 목록 표시 -->
<div class="row">
    <div class="col-md-8 offset-md-2">
        <div v-if="communityData.communityImages && communityData.communityImages.length > 0" class="mb-3">
            <h3 class="text-center mb-3">이미지</h3>
            <div class="image-list">
                <div v-for="(image, index) in communityData.communityImages" :key="index" class="image-item">
                    <!-- 이미지가 유효한 URL인 경우에만 출력 -->
                    <img :src="image" alt="이미지" class="img-fluid" loading="lazy" style="max-width: 200px; max-height: 200px;">
                    <!-- 이미지 삭제 버튼 -->
                    <button class="btn btn-sm delete-image-btn" @click="deleteImage(communityData.communityImageId[index], $event)"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </div>
    </div>
</div>
        
        <!-- 취소하기 및 수정하기 버튼 -->
        <div class="row" style="margin-top: 20px;">
            <div class="col">
                <button class="btn btn-secondary" @click="cancel">취소하기</button>
            </div>
            <div class="col">
                <button class="btn btn-primary" @click="modifyCommunity">수정하기</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CommunityUpdate',
    props: ['communityId', 'communityImages'],

    data() {
        return {
            communityData: {
                title: '',
                content: '',
                category: '',
                communityImages: [],
                communityImageId: [],
            },
            imageFile: null, // 이미지 파일을 저장할 변수 추가
        };
    },

    mounted() {
        this.axiosCommunityData();
    },

    methods: {
        handleImageUpload(event) {
    // 이미지 파일을 저장
    this.imageFile = event.target.files[0];
    
    // 이미지 파일을 업로드하고 URL을 가져와서 미리보기 이미지 배열에 추가
    this.axiosUploadImages(this.communityId)
        .then(response => {
            const imageUrl = response.data.url; // 이미지의 URL
            this.communityData.communityImages.push(imageUrl); // 미리보기 이미지 배열에 추가
        })
        .catch(error => {
            console.error('이미지 업로드 실패:', error);
        });
},
        async axiosUploadImages(communityId) {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const formData = new FormData();
                formData.append('files', this.imageFile);
                const url = `http://localhost:8080/api/v1/communityImages/upload/${communityId}`;
                const response = await axios.post(url, formData, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('이미지 업로드 성공:', response.data);

                const imageUrl = response.data.url
                this.communityData.communityImages.push(imageUrl)
            } catch (error) {
                console.error('이미지 업로드 실패:', error);
                throw error;
            }
        },
        async axiosCommunityData() {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get(`http://localhost:8080/api/v1/communityRead/${this.communityId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                const community = response.data;

                this.communityData.title = community.title;
                this.communityData.content = community.content;
                this.communityData.category = community.category;
                this.communityData.communityImages = community.communityImages;
                this.communityData.communityImageId = community.communityImageId;
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
                formData.append('communityId', this.communityData.communityId);
                formData.append('communityImageId', this.communityData.communityImageId);

                const accessToken = localStorage.getItem('accessToken');

                // 이미지 파일이 있는 경우에만 이미지 업로드 실행
                if (this.imageFile) {
                    await this.axiosUploadImages(this.communityId);
                }

                const url = `http://localhost:8080/api/v1/communityUpdate/${this.communityId}/${accessToken}`;

                const response = await axios.put(url, formData, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                alert('게시물이 수정되었습니다.');
                this.$router.push({ name: 'CommunityDetailView', params: { communityId: this.communityId } });
            } catch (error) {
                console.error('게시물 수정 실패', error);
            }
        },
        cancel() {
            window.history.back();
        },
        isImageUrl(url) {
            if (typeof url !== 'string') return false; // URL이 문자열이 아닌 경우 false 반환
            return url.startsWith('http') && (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.gif'));
        },

        async deleteImage(communityImageId, event) {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const url = `http://localhost:8080/api/v1/communityImage/${communityImageId}`;

        const response = await axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        // 이미지 삭제 후 communityData에서 해당 이미지와 이미지 ID 제거
        const index = this.communityData.communityImageId.indexOf(communityImageId);
        if (index !== -1) {
            this.communityData.communityImages.splice(index, 1);
            this.communityData.communityImageId.splice(index, 1);
        }

        alert('이미지가 삭제 되었습니다.');
    } catch (error) {
        console.error('이미지가 삭제가 안됩니다.', error);
    }
},
    },
};
</script>

<style>
</style>
