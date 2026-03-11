// don't even ask man...

document.querySelector('#app').innerHTML = `
<section class="xyCenter">
    <div class="frame">
        <div class="textYap">
            <span class="bigText"> Send Your Files </span>
            <p>Ever wanted to send your files without a restriction?</p>
            <p></p>
        </div>
    </div>

    <div class="frame">
        <div class="anotherElem">
            <pre id="logs">No logs yet. Send a file!</pre>
        </div>

        <div class="flex" style="gap: 5px;">
            <div class="button" onclick="chooseFile()">Choose File</div>
            <div class="button" onclick="showPopup('platformPopup')">Upload to...</div>
        </div>
    </div>
</section>

<section class="footer frame">
    <div class="button" onclick="showPopup('creditsPopup')">Credits</div>
    <div class="button" onclick="showPopup('aboutPopup')">About</div>
    <div class="button" onclick="showPopup('settingsPopup')">Settings</div>
    <a class="button" href="https://github.com/PinpointTools/SendYourFiles-RW">GitHub</a>
</section>
`