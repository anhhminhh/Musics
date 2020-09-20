$(function()
{
    var playerTrack = $("#player-track");
	var bgArtwork = $('#bg-artwork');
	var bgArtworkUrl;
	var albumName = $('#album-name');
	var trackName = $('#track-name');
	var albumArt = $('#album-art'),
		sArea = $('#s-area'),
		seekBar = $('#seek-bar'),
		trackTime = $('#track-time'),
		insTime = $('#ins-time'),
		sHover = $('#s-hover'),
		playPauseButton = $("#play-pause-button"),
		i = playPauseButton.find('i'),
		tProgress = $('#current-time'),
		tTime = $('#track-length'),
		seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
		buffInterval = null, tFlag = false;
	
	var playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;
	
	var songs = [{
		artist: "Hoài Lâm x Freak D (Lofi.)",
		name: "Hoa Nở Không Màu",
		url: "Musics/HoaNoKhongMau.mp3",
		picture: "https://user-images.githubusercontent.com/58257552/93663066-2c605700-fa8f-11ea-90f8-3370fd4da1aa.jpg"
	}, {
		artist: "Liz Kim Cương x Trịnh Thăng Bình",
		name: "Em Cần Một Người Quan Tâm",
		url: "Musics/EmCanMotNguoiQuanTam.mp3",
		picture: "https://user-images.githubusercontent.com/58257552/93663066-2c605700-fa8f-11ea-90f8-3370fd4da1aa.jpg"
<div class="z-buttons-setting" data-clipboard-text="Ngày hôm nay cớ sao em buồn 
Thứ anh chưa một lần hỏi 
Ngại rằng sẽ khiến anh phiền lòng 
Nên em cũng chẳng nói 
Nhiều khi giận dỗi anh mấy lần 
Khiến anh cho em bất cần 
Em chẳng cần điều gì xa xăm 
Chỉ cần một người quan tâm 
Lạc bước giữa đám đông 
Chẳng còn ai chung bước 
Thật sự em chẳng hiểu 
Ý nghĩa của ai sẽ xin lỗi trước 
Những điều em đã nghĩ 
Thật sự không như ý 
Nhưng thứ anh quan tâm lúc này 
Chẳng phải em 
Ngày hôm nay cớ sao em buồn 
Thứ anh chưa một lần hỏi 
Ngại rằng sẽ khiến anh phiền lòng 
Nên em cũng chẳng nói 
Nhiều khi giận dỗi anh mấy lần 
Khiến anh cho em bất cần 
Em chẳng cần điều gì xa xăm 
Chỉ cần một người quan tâm 
Em ơi quan tâm thế nào là vừa lòng 
Em ơi yêu nhau thế nào là một lòng 
Em hãy chỉ ra vấn đề dù dài dòng 
Có thể cho anh biết không 
Anh đang lo toan mỏi mệt vì cuộc sống 
Anh nghĩ hôm nay 
Anh cần một khoảng trống 
Ta nên chia tay để tìm người hằng mong 
Có phải không 
Thời gian qua có lẽ em rất buồn 
Thứ em hằng quan tâm chỉ là tình yêu 
Thời gian qua có lẽ em rất phiền 
Thế em chọn ra đi cho người bình yên 
Ngày hôm nay cớ sao 
Em buồn thứ anh chưa một lần hỏi 
Ngại rằng sẽ khiến anh 
Nên em cũng chẳng nói 
Nhiều khi giận dỗi anh mấy lần 
Khiến anh cho em bất cần 
Em chẳng cần điều gì xa xăm 
Chỉ cần một người quan tâm 
Thời gian qua em cảm ơn anh nhiều 
Đã chịu đựng em khi mình còn yêu 
Thời gian qua có lẽ em rất phiền 
Thế em chọn ra đi cho người bình yên 
Nhiều khi giận dỗi anh mấy lần 
Khiến anh cho em bất cần 
Em chẳng cần điều gì xa xăm 
Chỉ cần một người quan tâm" data-for="z-copy-lyric" data-delay-show="0" data-delay-hide="1000" data-event="click" data-event-off="mousemove" data-tip="Đã sao chép" currentitem="false" style="bottom: 140px;"><span class="z-setting-btn"><i class="icon ic-copy-text"></i><div class="__react_component_tooltip place-top type-dark" id="z-copy-lyric" aria-haspopup="true" data-id="tooltip"></div></span></div>
	}, {
		artist: "Trung Quân",
		name: "Tinh Nào Không Như Tình Đầu",
		url: "Musics/TinhNaoKhongNhuTinhDau.mp3",
		picture: "https://user-images.githubusercontent.com/58257552/93663066-2c605700-fa8f-11ea-90f8-3370fd4da1aa.jpg"
	}, {
		artist: "Gil Lê",
		name: "Sao Người Ta Nở Làm Mình Đau",
		url: "Musics/SaoNguoiTaNoLamMinhDau.mp3",
		picture: "https://user-images.githubusercontent.com/58257552/93663066-2c605700-fa8f-11ea-90f8-3370fd4da1aa.jpg"
	}]
	
	function shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}
	songs = shuffle(songs);

    function playPause()
    {
        setTimeout(function()
        {
            if(audio.paused)
            {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class','fas fa-pause');
                audio.play();
            }
            else
            {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class','fas fa-play');
                audio.pause();
            }
        },300);
    }

    	
	function showHover(event)
	{
		seekBarPos = sArea.offset(); 
		seekT = event.clientX - seekBarPos.left;
		seekLoc = audio.duration * (seekT / sArea.outerWidth());
		
		sHover.width(seekT);
		
		cM = seekLoc / 60;
		
		ctMinutes = Math.floor(cM);
		ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
		
		if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
        if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
		if(ctMinutes < 10)
			ctMinutes = '0'+ctMinutes;
		if(ctSeconds < 10)
			ctSeconds = '0'+ctSeconds;
        
        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
		    insTime.text(ctMinutes+':'+ctSeconds);
            
		insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);
		
	}

    function hideHover()
	{
        sHover.width(0);
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);		
    }
    
    function playFromClickedPos()
    {
        audio.currentTime = seekLoc;
		seekBar.width(seekT);
		hideHover();
    }

    function updateCurrTime()
	{
        nTime = new Date();
        nTime = nTime.getTime();

        if( !tFlag )
        {
            tFlag = true;
            trackTime.addClass('active');
        }

		curMinutes = Math.floor(audio.currentTime / 60);
		curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
		
		durMinutes = Math.floor(audio.duration / 60);
		durSeconds = Math.floor(audio.duration - durMinutes * 60);
		
		playProgress = (audio.currentTime / audio.duration) * 100;
		
		if(curMinutes < 10)
			curMinutes = '0'+curMinutes;
		if(curSeconds < 10)
			curSeconds = '0'+curSeconds;
		
		if(durMinutes < 10)
			durMinutes = '0'+durMinutes;
		if(durSeconds < 10)
			durSeconds = '0'+durSeconds;
        
        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
		    tProgress.text(curMinutes+':'+curSeconds);
        
        if( isNaN(durMinutes) || isNaN(durSeconds) )
            tTime.text('00:00');
        else
		    tTime.text(durMinutes+':'+durSeconds);
        
        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');

        
		seekBar.width(playProgress+'%');
		
		if( playProgress == 100 )
		{
			i.attr('class','fa fa-play');
			seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
			selectTrack(1);
		}
    }
    
    function checkBuffering()
    {
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        { 
            if( (nTime == 0) || (bTime - nTime) > 1000  )
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }

    function selectTrack(flag)
    {
        if( flag == 0 || flag == 1 )
            ++currIndex;
        else
            --currIndex;

        if( (currIndex > -1) && (currIndex < songs.length) )
        {
            if( flag == 0 )
                i.attr('class','fa fa-play');
            else
            {
                albumArt.removeClass('buffering');
                i.attr('class','fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');
			
			currAlbum = songs[currIndex].name;
            currTrackName = songs[currIndex].artist;
            currArtwork = songs[currIndex].picture;

            audio.src = songs[currIndex].url;
            
            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if(flag != 0)
            {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');
            
                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            $('#album-art img').prop('src', bgArtworkUrl);
        }
        else
        {
            if( flag == 0 || flag == 1 )
                --currIndex;
            else
                ++currIndex;
        }
    }

    function initPlayer()
	{	
        audio = new Audio();

		selectTrack(0);
		
		audio.loop = false;
		
		playPauseButton.on('click',playPause);
		
		sArea.mousemove(function(event){ showHover(event); });
		
        sArea.mouseout(hideHover);
        
        sArea.on('click',playFromClickedPos);
		
        $(audio).on('timeupdate',updateCurrTime);

        playPreviousTrackButton.on('click',function(){ selectTrack(-1);} );
        playNextTrackButton.on('click',function(){ selectTrack(1);});
	}
    
	initPlayer();
});
