// making array of song names
let songnames = [
    "Unison - Aperture (NCS Release)", "Tobu - Hope (NCS Release)", "Au5 & Last Heroes - Lush (NCS Release)", "Itro & Tobu - Cloud 9 (NCS Release)", "Jim Yosef - Arrow [NCS Release]", "Jim Yosef - Firefly [NCS Release]", "Jim Yosef - Lights (NCS Release)", "Tobu - Good Times (NCS Release)", "Tobu - Sound of Goodbye (NCS Release)", "Inukshuk - The Long Road Home"]

// variables
let index = 0;
let audioelement = new Audio(`songs/${index + 1}.mp3`);
let play_pause_btn = document.getElementById('main_btn');
let previous_btn = document.getElementById('previous');
let forward_btn = document.getElementById('forward')
let img_gif = document.querySelector('.songdetail img');
let progress_bar = document.getElementById('progressbar');
let play_btn_list = Array.from(document.getElementsByClassName('songitemplay'));
let mastersongname = document.getElementById('mastersongname');

// handle audio request
play_pause_btn.addEventListener('click', () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        play_pause_btn.classList.remove('fa-play-circle-o');
        play_pause_btn.classList.add('fa-pause-circle-o');
        img_gif.style.opacity = 1;
        mastersongname.innerText = songnames[index];
        let btn = document.getElementById(index);
        btn.classList.remove('fa-play-circle-o');
        btn.classList.add('fa-pause-circle-o');

    } else {
        audioelement.pause();
        play_pause_btn.classList.remove('fa-pause-circle-o');
        play_pause_btn.classList.add('fa-play-circle-o');
        img_gif.style.opacity = 0;
        make_all_pause();
    }
})
window.addEventListener('keydown', (e) => {
    if (e.keycode == 32 || e.which == 32) {
        e.preventDefault();
        if (audioelement.paused || audioelement.currentTime <= 0) {
            audioelement.play();
            play_pause_btn.classList.remove('fa-play-circle-o');
            play_pause_btn.classList.add('fa-pause-circle-o');
            img_gif.style.opacity = 1;
            mastersongname.innerText = songnames[index];
            let btn = document.getElementById(index);
            btn.classList.remove('fa-play-circle-o');
            btn.classList.add('fa-pause-circle-o');

        } else {
            audioelement.pause();
            play_pause_btn.classList.remove('fa-pause-circle-o');
            play_pause_btn.classList.add('fa-play-circle-o');
            img_gif.style.opacity = 0;
            make_all_pause();
        }
    }
})
// handle progressbar
audioelement.addEventListener('timeupdate', () => {
    let value_bar = ((audioelement.currentTime / audioelement.duration) * 100);
    progress_bar.value = value_bar;
    if (audioelement.currentTime == audioelement.duration) {
        if (index >= songnames.length - 1) {
            index = 0;
        } else {
            index += 1;
        }
        make_all_pause();
        let btn = document.getElementById(index);
        btn.classList.remove('fa-play-circle-o');
        btn.classList.add('fa-pause-circle-o');
        audioelement.src = `songs/${index + 1}.mp3`;
        audioelement.currentTime = 0;
        audioelement.play();
        mastersongname.innerText = songnames[index]
    }
})
progress_bar.addEventListener('change', () => {
    audioelement.currentTime = ((progress_bar.value * audioelement.duration) / 100);
})

// handle audio request by list
const make_all_pause = () => {
    play_btn_list.forEach((element) => {
        element.classList.remove('fa-pause-circle-o');
        element.classList.add('fa-play-circle-o');
    })
}
play_btn_list.forEach((element) => {
    element.addEventListener('click', (e) => {
        if(e.target.className=='fa fa-lg songitemplay fa-pause-circle-o'){
            make_all_pause();
            audioelement.pause();
            play_pause_btn.classList.remove('fa-pause-circle-o');
            play_pause_btn.classList.add('fa-play-circle-o');
            img_gif.style.opacity = 0;
        }else{
            make_all_pause();
            index = parseInt(e.target.id);
            audioelement.src = `songs/${index + 1}.mp3`;
            audioelement.currentTime = 0;
            audioelement.play();
            e.target.classList.remove('fa-play-circle-o');
            e.target.classList.add('fa-pause-circle-o');
            play_pause_btn.classList.remove('fa-play-circle-o');
            play_pause_btn.classList.add('fa-pause-circle-o');
            img_gif.style.opacity = 1;
            mastersongname.innerText = songnames[index];
        }
    })
})
// handle backward request
previous_btn.addEventListener('click', () => {
    if (index <= 0) {
        index = 0;
    } else {
        index -= 1;
    }
    make_all_pause();
    let btn = document.getElementById(index);
    btn.classList.remove('fa-play-circle-o');
    btn.classList.add('fa-pause-circle-o');
    audioelement.src = `songs/${index + 1}.mp3`;
    audioelement.currentTime = 0;
    audioelement.play();
    play_pause_btn.classList.remove('fa-play-circle-o');
    play_pause_btn.classList.add('fa-pause-circle-o');
    img_gif.style.opacity = 1;
    mastersongname.innerText = songnames[index];
})

//handling forward request
forward_btn.addEventListener('click', () => {
    if (index >= songnames.length - 1) {
        index = 0;
    } else {
        index += 1;
    }
    make_all_pause();
    let btn = document.getElementById(index);
    btn.classList.remove('fa-play-circle-o');
    btn.classList.add('fa-pause-circle-o');
    audioelement.src = `songs/${index + 1}.mp3`;
    audioelement.currentTime = 0;
    audioelement.play();
    play_pause_btn.classList.remove('fa-play-circle-o');
    play_pause_btn.classList.add('fa-pause-circle-o');
    img_gif.style.opacity = 1;
    mastersongname.innerText = songnames[index];
})

// making hamburger functional
let burger = document.getElementById('burger')
let ul = document.getElementById('ul');
burger.addEventListener('click', () => {
    ul.classList.toggle('ham-h');
})