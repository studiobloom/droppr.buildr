document.addEventListener("DOMContentLoaded", function () {
    // Get references to form elements
    const desktopVideoInput = document.getElementById("desktopVideo");
    const mobileVideoInput = document.getElementById("mobileVideo");
    const logoImageInput = document.getElementById("logoImage");
    const generateBuildButton = document.getElementById("generateBuild");

    // Get references to link and social media input elements
    const link1URLInput = document.getElementById("link1URL");
    const link1ImageInput = document.getElementById("link1");
    const link2URLInput = document.getElementById("link2URL");
    const link2ImageInput = document.getElementById("link2");
    const link3URLInput = document.getElementById("link3URL");
    const link3ImageInput = document.getElementById("link3");
    const link4URLInput = document.getElementById("link4URL");
    const link4ImageInput = document.getElementById("link4");

    // Get references to social media input elements
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

    // Handle form submission when the "Generate Build" button is clicked
    generateBuildButton.addEventListener("click", function () {
        // Gather user-selected assets and data
        const desktopVideoFile = desktopVideoInput.files[0];
        const mobileVideoFile = mobileVideoInput.files[0];
        const logoImage = logoImageInput.files[0];

        const [
            link1URL, link1Image,
            link2URL, link2Image,
            link3URL, link3Image,
            link4URL, link4Image,
            social1URL, social1Image,
            social2URL, social2Image,
            social3URL, social3Image,
            social4URL, social4Image,
            social5URL, social5Image
          ] = [
            link1URLInput.value, link1ImageInput.files[0],
            link2URLInput.value, link2ImageInput.files[0],
            link3URLInput.value, link3ImageInput.files[0],
            link4URLInput.value, link4ImageInput.files[0],
            social1URLInput.value, social1ImageInput.files[0],
            social2URLInput.value, social2ImageInput.files[0],
            social3URLInput.value, social3ImageInput.files[0],
            social4URLInput.value, social4ImageInput.files[0],
            social5URLInput.value, social5ImageInput.files[0]
          ];
          

        // Create a zip file using the chosen assets and data
        const zip = new JSZip();

        if (desktopVideoFile) { zip.file("videos/desktop.mp4", desktopVideoFile); }
        if (mobileVideoFile) { zip.file("videos/mobile.mp4", mobileVideoFile); }
        if (logoImage) { zip.file("images/logo.svg", logoImage); }
        if (link1Image) { zip.file("images/link1.svg", link1Image); }
        if (link2Image) { zip.file("images/link2.svg", link2Image); }
        if (link3Image) { zip.file("images/link3.svg", link3Image); }
        if (link4Image) { zip.file("images/link4.svg", link4Image); }
        if (social1Image) { zip.file("images/social1.svg", social1Image); }
        if (social2Image) { zip.file("images/social2.svg", social2Image); }
        if (social3Image) { zip.file("images/social3.svg", social3Image); }
        if (social4Image) { zip.file("images/social4.svg", social4Image); }
        if (social5Image) { zip.file("images/social5.svg", social5Image); }

        // Modify the template's content using the user-submitted data
        const modifiedHTML = getModifiedHTML(link1URL, link2URL, link3URL, link4URL, social1URL, social2URL, social3URL, social4URL, social5URL);

        // Add the modified HTML to the zip file
        zip.file("index.html", modifiedHTML);

        // Generate the zip file and save it
        zip.generateAsync({ type: "blob" }).then(function (blob) {
            // Save the generated zip file
            saveAs(blob, "website_build.zip");
        });
    });

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
            
            #logoTop {
                height: 10VW;
                object-fit: contain;
                align-items: center;
                padding: 1%;
            }
            
            #navTop {
                z-index: 1;
                position: fixed;
                top: 1%;
                width: 100%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                height: 10VW;
            }
            
            .nav {
                width: 8VW; 
                height: 8VW;
            }

            .navImage {
                width: auto;
                height: 4vh;
                object-fit: scale-down;
              }
            
            
            .links {
                padding: 1%;
            }
            
            #logoMiddle {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 40%;
                object-fit: contain;
            }
            
            .social-icon {
                width: 7VW;
                height: 7VW;
                padding: 10px;
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
              <div id="backgroundVideoContainer">
                  <video autoplay loop muted playsinline id="backgroundVideo">
                      <source src="videos/desktop.mp4" media="(min-width: 100VW)">
                      <source src="videos/mobile.mp4">
                  </video>
              </div>
              <header>
                  <img id="logoTop" src="images/logo.svg" alt="Logo">
                  <nav id="navTop">
                      <a href="${link1URL}" target="_blank" class="links"><img src="images/link1.svg" loading="eager" alt="${link1URL}" class="navImage"></a>
                      ${link2URL ? `<a href="${link2URL}" target="_blank" class="links"><img src="images/link2.svg" loading="eager" alt="${link2URL}" class="navImage"></a>` : ''}
                      ${link3URL ? `<a href="${link3URL}" target="_blank" class="links"><img src="images/link3.svg" loading="eager" alt="${link3URL}" class="navImage"></a>` : ''}
                      ${link4URL ? `<a href="${link4URL}" target="_blank" class="links"><img src="images/link4.svg" loading="eager" alt="${link4URL}" class="navImage"></a>` : ''}
                  </nav>
              </header>
              <main>
                  <img id="logoMiddle" src="images/logo.svg" alt="Logo">
              </main>
              <footer>
                  <nav id="navBottom">
                      <a href="${social1URL}" target="_blank" class="social"><img src="images/social1.svg" loading="eager" alt="${social1URL}" class="social-icon"></a>
                      ${social2URL ? `<a href="${social2URL}" target="_blank" class="social"><img src="images/social2.svg" loading="eager" alt="${social2URL}" class="social-icon"></a>` : ''}
                      ${social3URL ? `<a href="${social3URL}" target="_blank" class="social"><img src="images/social3.svg" loading="eager" alt="${social3URL}" class="social-icon"></a>` : ''}
                      ${social4URL ? `<a href="${social4URL}" target="_blank" class="social"><img src="images/social4.svg" loading="eager" alt="${social4URL}" class="social-icon"></a>` : ''}
                      ${social5URL ? `<a href="${social5URL}" target="_blank" class="social"><img src="images/social5.svg" loading="eager" alt="${social5URL}" class="social-icon"></a>` : ''}
                  </nav>
              </footer>    
          </body>
          </html>`;
        
        // Replace the original template's HTML with the modified content
        return templateHTML;
      }
  });
