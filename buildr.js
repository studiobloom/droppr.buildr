document.addEventListener("DOMContentLoaded", function () {
    const desktopVideoInput = document.getElementById("desktopVideo");
    const mobileVideoInput = document.getElementById("mobileVideo");
    const logoImageInput = document.getElementById("logoImage");
    const fontFileInput = document.getElementById("fontFile");
    const generateBuildButton = document.getElementById("generateBuild");
    const link1URLInput = document.getElementById("link1URL");
    const link1Input = document.getElementById("link1");
    const link2URLInput = document.getElementById("link2URL");
    const link2Input = document.getElementById("link2");
    const link3URLInput = document.getElementById("link3URL");
    const link3Input = document.getElementById("link3");
    const link4URLInput = document.getElementById("link4URL");
    const link4Input = document.getElementById("link4");
    const social1URLInput = document.getElementById("social1URL");
    const social1ImageInput = document.getElementById("social1");
    const social2URLInput = document.getElementById("social2URL");
    const social2ImageInput = document.getElementById("social2");
    const social3URLInput = document.getElementById("social3URL");
    const social3ImageInput = document.getElementById("social3");
    const social4URLInput = document.getElementById("social4URL");
    const social4ImageInput = document.getElementById("social4");
    const social5URLInput = document.getElementById("social5URL");
    const social5ImageInput = document.getElementById("social5");
    generateBuildButton.addEventListener("click", async function () {
        const desktopVideoFile = desktopVideoInput.files[0];
        const mobileVideoFile = mobileVideoInput.files[0];
        const logoImage = logoImageInput.files[0];
        const fontFile = fontFileInput.files[0];
        const [
            link1URL, link1Text,
            link2URL, link2Text,
            link3URL, link3Text,
            link4URL, link4Text,
            social1URL, social1Image,
            social2URL, social2Image,
            social3URL, social3Image,
            social4URL, social4Image,
            social5URL, social5Image
        ] = [
                link1URLInput.value, link1Input.value,
                link2URLInput.value, link2Input.value,
                link3URLInput.value, link3Input.value,
                link4URLInput.value, link4Input.value,
                social1URLInput.value, social1ImageInput.files[0],
                social2URLInput.value, social2ImageInput.files[0],
                social3URLInput.value, social3ImageInput.files[0],
                social4URLInput.value, social4ImageInput.files[0],
                social5URLInput.value, social5ImageInput.files[0]
            ];
        const zip = new JSZip();
        if (desktopVideoFile) { zip.file("videos/desktop.mp4", desktopVideoFile); }
        if (mobileVideoFile) { zip.file("videos/mobile.mp4", mobileVideoFile); }
        if (logoImage) { zip.file("images/logo.svg", logoImage); }
        if (social1Image) { zip.file("images/social1.svg", social1Image); }
        if (social2Image) { zip.file("images/social2.svg", social2Image); }
        if (social3Image) { zip.file("images/social3.svg", social3Image); }
        if (social4Image) { zip.file("images/social4.svg", social4Image); }
        if (social5Image) { zip.file("images/social5.svg", social5Image); }
        const fontColor = document.getElementById('fontColor').value;
        const linkTexts = [link1Text, link2Text, link3Text, link4Text];
        const svgPaths = await generateSVGs(fontFile, linkTexts, fontColor);
        svgPaths.forEach((svgPath, index) => {
            zip.file(`images/link${index + 1}.svg`, new Blob([svgPath], { type: 'image/svg+xml;charset=utf-8' }));
        });
        const modifiedHTML = getModifiedHTML(link1URL, link2URL, link3URL, link4URL, social1URL, social2URL, social3URL, social4URL, social5URL);
        zip.file("index.html", modifiedHTML);
        zip.generateAsync({ type: "blob" }).then(function (blob) {
            saveAs(blob, "website_build.zip");
        });
    });
    function checkFileSize(inputElement, maxSizeMB) {
        const file = inputElement.files[0];
        if (file && file.size > maxSizeMB * 1024 * 1024) {
            alert(`File size exceeds the limit of ${maxSizeMB}MB`);
            inputElement.value = "";
        }
    }
    desktopVideoInput.addEventListener("change", function () {
        checkFileSize(this, 5);
    });
    mobileVideoInput.addEventListener("change", function () {
        checkFileSize(this, 5);
    });
    async function generateSVGs(fontFile, texts, fontColor) {
        const fileReader = new FileReader();
        const fontFilePromise = new Promise(resolve => {
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.readAsArrayBuffer(fontFile);
        });
        const fontArrayBuffer = await fontFilePromise;
        const font = opentype.parse(fontArrayBuffer);
        const fontSize = 300;
        return texts.map(text => {
            const path = font.getPath(text, 0, 225, fontSize);
            const bbox = path.getBoundingBox();
            const width = bbox.x2 - bbox.x1;
            const height = bbox.y2 - bbox.y1;
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${bbox.x1} ${bbox.y1} ${width} ${height}"><path fill="${fontColor}" d="${path.toPathData()}"/></svg>`;
            console.log(svg);
            return svg;
        });
    }
    function getModifiedHTML(link1URL, link2URL, link3URL, link4URL, social1URL, social2URL, social3URL, social4URL, social5URL) {
        const templateHTML = `
        <!DOCTYPE html><!--     ~~~~MADE WITH DROPPR.XYZ~~~~    -->
        <html>
        <head>
          <style>
            body, html {
                height: 100%;
                margin: 0;
                padding: 0;
                overflow: hidden;
            }
            body, html {
                height: 100%;
                margin: 0;
                padding: 0;
                overflow: hidden;
            }
            #backgroundVideoContainer {
                position: fixed;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                overflow: hidden;
                z-index: -1;
            }
            #backgroundVideo {
                position: fixed;
                top: 50%;
                left: 50%;
                min-width: 100%;
                min-height: 100%;
                width: auto;
                height: auto;
                z-index: -1;
                transform: translate(-50%, -50%);
            }
            header, main, footer {
                position: relative;
                z-index: 1;
                height: 10VW;
            }
            #navTop {
                z-index: 2;
                position: fixed;
                top: 1%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 5VW;
                }
            #logoTop {
                width: 12VW;
                object-fit: scale-down;
                padding: 1%;
                }
            .links {
                white-space: nowrap;
                }
            #logoTop img {
                height: 100%;
            }
                .links a {
                padding: 0 10px;
            }
            .nav {
                width: 8VW; 
                height: 8VW;
            }
            .navImage {
                width: 17VW;
                max-width: 200px;
            }
            #logoMiddle {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 75VW;
                max-width: 700px;
                object-fit: contain;
            }
            .social-icon {
                width: 15VW;
                max-width: 115px;
                height: 15VW;
                max-height: 115px;
                padding: 2px;
            }
            #navBottom {
                z-index: 1;
                position: fixed;
                bottom: 0;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 15px;
            }            
          </style>
        </head>
          <body>
                  <nav id="navTop">
                    <div id="logoTop">
                        <img src="images/logo.svg" alt="Logo">
                    </div>
                    <div class="links">
                      <a href="${link1URL}" target="_blank" class="links"><img src="images/link1.svg" loading="eager" alt="${link1URL}" class="navImage"></a>
                      ${link2URL ? `<a href="${link2URL}" target="_blank" class="links"><img src="images/link2.svg" loading="eager" alt="${link2URL}" class="navImage"></a>` : ''}
                      ${link3URL ? `<a href="${link3URL}" target="_blank" class="links"><img src="images/link3.svg" loading="eager" alt="${link3URL}" class="navImage"></a>` : ''}
                      ${link4URL ? `<a href="${link4URL}" target="_blank" class="links"><img src="images/link4.svg" loading="eager" alt="${link4URL}" class="navImage"></a>` : ''}
                    </div>
                  </nav>
              <main>
                  <img id="logoMiddle" src="images/logo.svg" alt="Logo">
              </main>
                  <nav id="navBottom">
                      <a href="${social1URL}" target="_blank" class="social"><img src="images/social1.svg" loading="eager" alt="${social1URL}" class="social-icon"></a>
                      ${social2URL ? `<a href="${social2URL}" target="_blank" class="social"><img src="images/social2.svg" loading="eager" alt="${social2URL}" class="social-icon"></a>` : ''}
                      ${social3URL ? `<a href="${social3URL}" target="_blank" class="social"><img src="images/social3.svg" loading="eager" alt="${social3URL}" class="social-icon"></a>` : ''}
                      ${social4URL ? `<a href="${social4URL}" target="_blank" class="social"><img src="images/social4.svg" loading="eager" alt="${social4URL}" class="social-icon"></a>` : ''}
                      ${social5URL ? `<a href="${social5URL}" target="_blank" class="social"><img src="images/social5.svg" loading="eager" alt="${social5URL}" class="social-icon"></a>` : ''}
                  </nav>
                <div id="backgroundVideoContainer">
                <video autoplay loop muted playsinline id="backgroundVideo">
                </video>
              </div>
            </body>
          <script>
            var video = document.getElementById('backgroundVideo');
            function setVideoSource() {
                while (video.firstChild) {
                    video.removeChild(video.firstChild);
                }
                var source = document.createElement('source');
                if (window.innerWidth > 768) {
                    source.src = "videos/desktop.mp4";
                } else {
                    source.src = "videos/mobile.mp4";
                }
                video.appendChild(source);
                video.load();
            }
            setVideoSource();
            window.onresize = setVideoSource;
            </script>
          </html>`;
        return templateHTML;
    }
});
