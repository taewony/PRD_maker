# Next.js 프로젝트 GitHub Pages 배포 가이드

이 문서는 Next.js로 만든 정적(static) 웹사이트를 GitHub Pages에 배포하는 전체 과정을 상세히 안내합니다. GitHub Actions를 이용한 자동 배포 방법을 사용하며, 발생할 수 있는 문제와 해결 방법, 그리고 배포 과정을 직접 확인하는 방법을 포함합니다.

---

### 1단계: Next.js 프로젝트 정적 출력 설정

GitHub Pages는 서버를 실행할 수 없는 정적 파일 호스팅 서비스입니다. 따라서 Next.js 프로젝트를 순수한 HTML, CSS, JS 파일 묶음으로 변환하는 '정적 내보내기(static export)' 설정이 필요합니다.

1.  프로젝트의 루트 디렉토리에서 `next.config.mjs` 파일을 열거나 생성합니다.
2.  아래와 같이 `output: 'export'` 설정을 추가합니다.

    ```javascript
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      output: 'export',
    };

    export default nextConfig;
    ```

### 2단계: (필요시) ESLint 오류 수정

빌드 과정에서 JSX 내부에 따옴표나 큰따옴표를 직접 사용하면 ESLint 오류가 발생할 수 있습니다.

-   **오류 예시:** `react/no-unescaped-entities`
-   **해결:** 코드에 직접 사용된 따옴표(`'`)나 큰따옴표(`"`)를 HTML 엔티티 코드로 변경합니다.
    -   `'문자열'` → `&apos;문자열&apos;`
    -   `"문자열"` → `&quot;문자열&quot;`

### 3단계: GitHub Actions 워크플로우 파일 생성

프로젝트가 푸시될 때마다 자동으로 빌드 및 배포를 수행할 GitHub Actions의 설정 파일을 만듭니다.

1.  프로젝트 루트에 `.github/workflows` 폴더를 생성합니다.
2.  해당 폴더 안에 `deploy.yml` 파일을 생성하고 아래 내용을 붙여넣습니다.

    ```yaml
    name: Deploy to GitHub Pages

    on:
      push:
        branches:
          - main # main 브랜치에 푸시될 때마다 실행
      workflow_dispatch: # 수동 실행도 가능하도록 설정

    permissions:
      contents: read
      pages: write
      id-token: write

    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout
            uses: actions/checkout@v4
          - name: Setup Node.js
            uses: actions/setup-node@v4
            with:
              node-version: "20"
              cache: 'npm'
          - name: Install Dependencies
            run: npm install
          - name: Build
            run: npm run build
          - name: Setup Pages
            uses: actions/configure-pages@v4
          - name: Upload artifact
            uses: actions/upload-pages-artifact@v3
            with:
              path: ./out # 1단계 설정으로 생성된 정적 파일 폴더

      deploy:
        environment:
          name: github-pages
          url: ${{ steps.deployment.outputs.page_url }}
        runs-on: ubuntu-latest
        needs: build
        steps:
          - name: Deploy to GitHub Pages
            id: deployment
            uses: actions/deploy-pages@v4
    ```

### 4단계: GitHub 저장소 설정 변경

GitHub에게 배포를 GitHub Actions를 통해 처리하도록 알려줍니다. **이 단계가 매우 중요합니다.**

1.  배포할 GitHub 저장소의 `Settings` 탭으로 이동합니다.
2.  왼쪽 메뉴에서 `Pages`를 클릭합니다.
3.  **`Build and deployment`** 섹션에서 `Source`를 **`GitHub Actions`**로 변경하고 저장합니다.

### 5단계: 코드 푸시 및 배포 실행

이제 모든 설정이 완료되었습니다. 변경된 파일들을 GitHub에 푸시하여 배포를 시작합니다.

```bash
# 1. Git 원격 저장소 연결 (최초 한 번만)
git remote add origin <GitHub 저장소 URL>

# 2. 로컬 브랜치 이름을 'main'으로 변경 (필요시)
git branch -M main

# 3. 변경사항 커밋 및 푸시
git add .
git commit -m "Configure for GitHub Pages deployment"
git push -u origin main
```

---

### 6단계: 배포 과정 확인 및 문제 해결

코드를 푸시하면 GitHub Actions 워크플로우가 자동으로 실행됩니다. 이 과정을 직접 확인하고 문제가 발생했을 때 해결하는 방법은 다음과 같습니다.

#### 배포 과정 확인 방법

1.  GitHub 저장소의 **`Actions`** 탭으로 이동합니다.
2.  왼쪽 사이드바에서 `Deploy to GitHub Pages` 워크플로우를 클릭합니다.
3.  가장 최근의 실행 기록을 클릭하여 상세 내용을 확인합니다.
    -   **노란색 아이콘:** 작업이 현재 진행 중입니다.
    -   **녹색 체크 아이콘:** 작업이 성공적으로 완료되었습니다.
    -   **빨간색 X 아이콘:** 작업이 실패했습니다.

#### 흔한 문제와 해결 방법

-   **문제:** `build` 또는 `deploy` 작업에서 `Error: Get Pages site failed... HttpError: Not Found` 오류가 발생하며 실패하는 경우.
-   **원인:** GitHub Actions가 실행되는 시점과 `Settings > Pages`의 설정이 시스템에 완전히 적용되는 시점 간의 미세한 시간 차이 때문에 발생합니다. Actions가 배포할 장소를 찾지 못하는 것입니다.
-   **해결책 (가장 확실한 방법):**
    1.  실패한 워크플로우의 상세 화면으로 이동합니다.
    2.  오른쪽 상단에 있는 **`Re-run all jobs`** 버튼을 클릭합니다.
    3.  이렇게 하면 코드를 다시 푸시할 필요 없이, 올바르게 적용된 설정을 바탕으로 배포 작업만 다시 시작되어 대부분의 경우 문제가 해결됩니다.

### 7단계: 배포 완료 및 사이트 확인

`Actions` 탭에서 `deploy` 작업까지 모두 녹색 체크 아이콘으로 바뀌면 배포가 성공적으로 완료된 것입니다.

-   `Settings` > `Pages` 탭으로 다시 이동하면, 페이지 상단에 "Your site is live at `https://<사용자이름>.github.io/<저장소이름>`" 과 함께 최종 URL이 표시됩니다. 이 URL로 접속하여 배포된 웹사이트를 확인합니다.
