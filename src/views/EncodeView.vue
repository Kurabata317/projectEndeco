<template>
    <textarea class="textinput" v-model="text" placeholder="텍스트를 입력하세요" />
    <div class="after"> {{ utf8ToBase64(text) }} </div>
    <div class="buttonlist">
        <button @click="pasteClipboard">
            클립보드 붙여넣기
        </button>
        <button :disabled="text === ''" @click="copyToClipboard">
            결과 복사
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: ''
        };
    },
    methods: {
        utf8ToBase64(str) {
            return btoa(unescape(encodeURIComponent(str)));
        },
        async pasteClipboard() {
            try {
                const cbcopy = await navigator.clipboard.readText(); // 클립보드에서 텍스트 읽어오기
                this.text = cbcopy; // Vue 데이터에 할당
            } catch (err) {
                console.error('클립보드 읽기 오류:', err);
            }
        },
        async copyToClipboard() {
            try {
                await navigator.clipboard.writeText(this.utf8ToBase64(this.text));
                alert('복사되었습니다.');
            } catch (err) {
                console.error('클립보드 복사 오류:', err);
                alert('클립보드 복사에 실패했습니다.');
            }
        }
    }
}
</script>