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
        <label for="image" class="col-md-3 col-form-label"></label>
        <div class="mb-3 row justify-content-center">
            <div class="col-md-9">
                <label for="image" class="fa-solid fa-camera" style="cursor: pointer;"> 파일첨부</label>
                <input type="file" class="form-control" id="image" accept="image/*" @change="handleImageUpload" style="display: none;">

            </div>
        </div>

<!-- 이미지 목록 표시 -->
<div id="yong" class="row">
    <div class="col-md-8 offset-md-2">
        <div class="mb-3">
            <h3 class="text-center mb-3">이미지</h3>
            <div class="image-list d-flex flex-wrap justify-content-start">
                <!-- 커뮤니티 이미지 표시 -->
                <div v-for="(image, index) in communityData.communityImages" :key="'existing-' + index" class="image-item">
                    <img :src="image" alt="이미지" class="img-fluid" style="max-width: 200px; max-height: 200px;">
                    <button class="btn btn-sm delete-image-btn" @click="deleteImage(communityData.communityImageId[index], $event, index)"><i class="fa-solid fa-trash"></i></button>
                </div>
                <!-- 이미지 미리보기 표시 -->
                <div v-for="(previewImage, index) in previewImages" :key="'preview-' + index" class="image-item mx-2 mb-2">
                    <img :src="previewImage" alt="미리보기 이미지" class="img-fluid" loading="lazy" style="max-width: 200px; max-height: 200px;">
                    <button type="button" class="btn btn-sm" @click="removePreviewImage(index)"><i class="fa-solid fa-trash-can"></i></button>
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
                <button class="btn btn-primary" @click="modifyButton">수정하기</button>
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
            imageFile: [], // 이미지 파일을 저장할 변수 추가
            previewImages:[]
        };
    },

    mounted() {
        this.loadCommunityData()
    },

    methods: {
        loadCommunityData(){
            const storedData = JSON.parse(localStorage.getItem('communityData'))
            if(storedData) {
                this.communityData = storedData
            }else{
                this.axiosCommunityData()
            }
        },

        async handleImageUpload(event) {
    // 이미지 파일을 저장
    const imageFiles = event.target.files;
    for (let i = 0; i < imageFiles.length; i++) {
        const files = imageFiles[i];

        this.imageFile.push(files);
        this.previewImages.push(URL.createObjectURL(files));
    }

},

    removePreviewImage(index){
     // 미리보기 이미지를 삭제하면 실행될 로직
     this.imageFile.splice(index, 1); // 이미지 파일 배열에서 삭제
      this.previewImages.splice(index, 1); // 미리보기 배열에서 삭제
       // 인풋 요소에 남은 이미지들을 설정
       const inputElement = document.getElementById('image');
      const remainingImages = this.imageFile.map(file => file); // 파일 배열을 복사하여 사용
      inputElement.value = ''; // 인풋 요소의 값 초기화

      // FileList 객체 생성
      const fileList = new DataTransfer();
      remainingImages.forEach(file => {
      fileList.items.add(file); // 각 파일을 FileList에 추가
      });
      inputElement.files = fileList.files; // FileList를 인풋 요소의 files 속성에 설정
      this.$forceUpdate(); // 컴포넌트 강제 업데이트
    },

    async axiosUploadImage(imageFile, communityId) { // 매개변수 수정
    try {
        const accessToken = localStorage.getItem('accessToken');
        const formData = new FormData();
        
        // 여러 이미지 파일을 formData에 추가
        for (let i = 0; i < imageFile.length; i++) {
            formData.append('files', imageFile[i]);
        }

        const url = `http://localhost:8080/api/v1/communityImages/upload/${communityId}`;
        const response = await axios.post(url, formData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
        });
    
        console.log('이미지 업로드 성공:', response.data.content);

    } catch (error) {
        console.error('이미지 업로드 실패:', error);
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

                this.originalCommunityData = { ...community };

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


                const url = `http://localhost:8080/api/v1/communityUpdate/${this.communityId}/${accessToken}`;

                const response = await axios.put(url, formData, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                localStorage.removeItem('communityData')
                alert('게시물이 수정되었습니다.');
                this.$router.push({ name: 'CommunityDetailView', params: { communityId: this.communityId } });
            } catch (error) {
                console.error('게시물 수정 실패', error);
            }
        },
        cancel() {
            this.communityData = { ...this.originalCommunityData };
            this.$router.go(-1);
        },
        isImageUrl(url) {
            if (typeof url !== 'string') return false; // URL이 문자열이 아닌 경우 false 반환
            return url.startsWith('http') && (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.gif'));
        },

        async deleteImage(communityImageId, event, index) {
    try {
        
        const accessToken = localStorage.getItem('accessToken');
        const url = `http://localhost:8080/api/v1/communityImage/${communityImageId}`;

        const response = await axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

            this.communityData.communityImages.splice(index, 1);
            this.communityData.communityImageId.splice(index, 1);


        alert('이미지가 삭제 되었습니다.');
    } catch (error) {
        console.error('이미지가 삭제가 안됩니다.', error);
    }
},
modifyButton() {
    if (this.imageFile.length > 0) {
        this.axiosUploadImage(this.imageFile, this.communityId); // 이미지 파일과 커뮤니티 ID를 전달
    }
    this.modifyCommunity();
}


    },
};
</script>

<style>
</style>