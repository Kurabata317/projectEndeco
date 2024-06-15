<template>
    <textarea class="textinput" v-model="text" placeholder="텍스트를 입력하세요" />
    <div class="after"> {{ base64ToUtf8(text) }} </div>
    <div class="buttonlist">
        <button @click="pasteClipboard">
            클립보드 붙여넣기
        </button>
        <button :disabled="text === '' || base64ToUtf8(text) === '올바른 문자열이 아닙니다.'" @click="copyToClipboard">
            결과 복사
        </button>
        <button :disabled="!isValidURL(base64ToUtf8(text))">
            링크로 이동
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
        base64ToUtf8(base64Str, fallbackText = "올바른 문자열이 아닙니다.") {
            try {
                return decodeURIComponent(escape(atob(base64Str)));
            } catch (error) {
                console.error('Base64 디코딩 오류:', error);
                return fallbackText;
            }
        },
        isValidURL(url) {
            const urlPattern = new RegExp(
                '^(https?:\\/\\/)?' +        // 프로토콜(http, https) 처리
                '(localhost|' +              // localhost 또는
                '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}))' + // 도메인명(주소)
                '(\\:\\d+)?' +               // 포트
                '(\\/[-a-zA-Z\\d%_.~+]*)*' + // 경로
                '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' +  // 쿼리 문자열
                '(\\#[-a-zA-Z\\d_]*)?$', 'i');  // fragment(locational address)

            return urlPattern.test(url);
        },
        navigateToURL() {
            // 실제 URL로 이동하거나 원하는 작업을 수행하는 메서드
            window.location.href = this.urlInput;
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
                await navigator.clipboard.writeText(this.base64ToUtf8(this.text));
                alert('복사되었습니다.');
            } catch (err) {
                console.error('클립보드 복사 오류:', err);
                alert('클립보드 복사에 실패했습니다.');
            }
        }
    }
}
</script>