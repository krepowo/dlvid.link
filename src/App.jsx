import { useState, } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Feature from "./layout/bottom/Feature";
import SupportedSite from './layout/center/SupportedSite';

import loading from './assets/icons8-loading-100.png';

const MySwal = withReactContent(Swal);

function App() {
  const [downloadType, setDownloadType] = useState({
    downloadType: ''
  });
  const [Url, setUrl] = useState({
    url: ''
  });
  const [disabled, setDisabled] = useState(false);
  const [hideBtn, setHideBtn] = useState(false);

  async function downloadYoutube(ytURL, dlFormat) {

    const asdf = ytURL.split("&")[0];
    const info = await fetch(`https://youtube-download.krepowo.my.id/info?url=${asdf}`).catch(() => {
      MySwal.fire({
        icon: 'error',
        title: 'Error!',
        background: '#0f172a',
        color: '#FFFFFF',
        text: "Invalid URL, or the video is restricted.",
      });
      setDisabled(false);
      setHideBtn(false);
      return;
    });
    const ingfo = await info.json();
    if (ingfo.error) {
      MySwal.fire({
        icon: 'error',
        title: 'Error!',
        background: '#0f172a',
        color: '#FFFFFF',
        text: "Invalid URL, please re-check your link.",
      });
      setDisabled(false);
      setHideBtn(false);
      return;
    }

    const downloadUrl = `https://youtube-download.krepowo.my.id/download?url=${asdf}&format=${dlFormat}`;
    const filename = `${ingfo.videoDetails.title}.${dlFormat}`;

    window.location.href = `${downloadUrl}&filename=${filename}`;
    setDisabled(false);
    setHideBtn(false);
  }
  async function downloadInsta(insURL, dlFormat) {
    const info = await fetch(`https://youtube-download.krepowo.my.id/downloadv2?url=${insURL}`);
    const ingfo = await info.json();
    if (ingfo.error) {
      MySwal.fire({
        icon: 'error',
        title: 'Error!',
        background: '#0f172a',
        color: '#FFFFFF',
        text: "Invalid URL, please re-check your link.",
      });
      setDisabled(false);
      setHideBtn(false);
      return;
    }
    const filename = `${ingfo[0].meta.title}.${dlFormat}`;

    window.location.href = `${ingfo[0].url[0].url}&filename=${filename}`;
    setDisabled(false);
    setHideBtn(false);
  }
  async function downloadFB(fbURL, dlFormat) {
    const info = await fetch(`https://youtube-download.krepowo.my.id/downloadv2?url=${fbURL}`);
    const ingfo = await info.json();
    if (ingfo.error) {
      MySwal.fire({
        icon: 'error',
        title: 'Error!',
        background: '#0f172a',
        color: '#FFFFFF',
        text: "Invalid URL, please re-check your link.",
      });
      setDisabled(false);
      setHideBtn(false);
      return;
    }
    const filename = `${ingfo[0].meta.title}.${dlFormat}`;

    window.location.href = `${ingfo[0].url[0].url}&filename=${filename}`;
    setDisabled(false);
    setHideBtn(false);
  }
  function whereURLFrom(url, dlFormat) {
    if (url.includes("youtube.com")) {
      downloadYoutube(url, dlFormat);
      return;
    }
    if (url.includes("youtu.be")) {
      downloadYoutube(url, dlFormat);
      return;
    }
    if (url.includes("instagram.com")) {
      downloadInsta(url, dlFormat);
      return;
    }
    if (/(?:https?:\/\/)?(?:www\.)?facebook\.com/.test(url)) {
      downloadFB(url, dlFormat);
      return;
    }

    MySwal.fire({
      icon: 'error',
      title: 'Error!',
      background: '#0f172a',
      color: '#FFFFFF',
      text: "This site is currently not supported.",
    });
    setDisabled(false);
    setHideBtn(false);
  }


  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleDownloadTypeChange = (e) => {
    setDownloadType(e.target.value);
  };

  const handleForm = (e) => {
    e.preventDefault();
    setDisabled(true);
    setHideBtn(true);

    const type = downloadType;
    const url = Url;
    if (!url || !type) {
      MySwal.fire({
        icon: 'error',
        title: 'Error!',
        background: '#0f172a',
        color: '#FFFFFF',
        text: "Please fill the fields!",
      });
      setDisabled(false);
      setHideBtn(false);
    }
    whereURLFrom(url, type);


  };
  return (
    <div className="bg-gradient-to-bl from-slate-900 to-sky-700 w-full h-screen">
      <div className="App flex-col justify-center text-center pt-32">

        <h1 className="flex-col flex items-center justify-center space-y-3">
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="50px"
            width="50px"
            style={{ fill: "#FFFFFF" }}
          >
            <path
              fillRule="evenodd"
              d="M8 0a5.53 5.53 0 00-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.5a.5.5 0 011 0V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.354 15.854a.5.5 0 00.708 0l3-3a.5.5 0 00-.708-.708L8.5 14.293V11h-1v3.293l-2.146-2.147a.5.5 0 00-.708.708l3 3z"
            />
          </svg>
          <span className=" text-4xl font-bold underline text-white ">krepOwO Downloader</span>
        </h1>

        <form onSubmit={handleForm} className="flex flex-col items-center justify-center pt-10">
          <p className="text-white pb-1">Paste your URL:</p>
          <input id="url" className="bg-slate-600 text-white focus:outline-none p-2 rounded-md w-80" placeholder="https://" type="url" required onChange={handleUrlChange} />

          <SupportedSite />

          <img hidden={!hideBtn} src={loading} alt="loading..." className="w-16 p-3 animate-spin" />
          <div className="btn-format space-x-2" hidden={hideBtn}>

            <button type="submit" name="downloadType" value="mp3" className={`bg-blue-800 hover:bg-blue-700 text-white p-2 rounded-md mt-5 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={disabled} onClick={handleDownloadTypeChange}>
              Download MP3
            </button>
            <button type="submit" name="downloadType" value="mp4" className={`bg-blue-800 hover:bg-blue-700 text-white p-2 rounded-md mt-5 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={disabled} onClick={handleDownloadTypeChange}>
              Download MP4
            </button>
          </div>
        </form>

        <Feature />

        <h3 className="text-white pt-8">@2023. <a className="hover:underline" href="https://krepowo.my.id/" target="_blank" rel="noreferrer">KrepOwO</a></h3>
      </div>
    </div>
  );
}

export default App;
