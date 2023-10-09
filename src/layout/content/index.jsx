import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

const Content = memo(() => {
  return (
    <div className="flex justify-center w-full h-full overflow-hidden">
      <OverlayScrollbarsComponent defer>
        <div className="h-[50px]"></div>
        <div>
          <div className="max-w-[1040px] break-all">
            <Outlet />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <img src="/tiff/YYYMiniPlayerVolumeBarTailerDark.tiff" />
              <img src="/tiff/MiniPlayerPlaylistButtonDisabledDark.tiff" />
              <img src="/tiff/MiniPlayerPlaylistClosureDark.tiff" />
              <img src="/tiff/MiniPlayerVolumeButtonDisabled.tiff" />
              <img src="/tiff/MiniPlayerCloseButtonPressed.tiff" />
              <img src="/tiff/MiniPlayerLyricsButtonDark.tiff" />
              <img src="/tiff/MiniPlayerCloseButtonDark.tiff" />
              <img src="/tiff/MiniPlayerMiniAlbumDefault.tiff" />
              <img src="/tiff/YYYMiniPlayerVolumeBarHeaderDark.tiff" />
              <img src="/tiff/MiniPlayerVolumeButton.tiff" />
              <img src="/tiff/MiniPlayerPraisedButton.tiff" />
              <img src="/tiff/MiniPlayerLyricsButton.tiff" />
              <img src="/tiff/MiniPlayerLyricsButtonDisabled.tiff" />
              <img src="/tiff/MiniPlayerPraiseButtonDisabledDark.tiff" />
              <img src="/tiff/MiniPlayerLyricsButtonPressedDark.tiff" />
              <img src="/tiff/MiniPlayerPlaylistClosurePressed.tiff" />
              <img src="/tiff/MiniPlayerPlaylistInfoButton.tiff" />
              <img src="/tiff/MiniPlayerVolumeButtonPressed.tiff" />
              <img src="/tiff/MiniPlayerDislikeButtonPressedDark.tiff" />
              <img src="/tiff/MiniPlayerLyricsButtonDisabledDark.tiff" />
              <img src="/tiff/MiniPlayerPraiseButtonDisabled.tiff" />
              <img src="/tiff/MiniPlayerDeleteButtonDisabled.tiff" />
              <img src="/tiff/MiniPlayerPraisedButtonPressed.tiff" />
              <img src="/tiff/YYYMiniPlayerVolumeBarMin.tiff" />
              <img src="/tiff/YYYMiniPlayerVolumeBarTailer.tiff" />
              <img src="/tiff/MiniPlayerPraiseButtonPressedDark.tiff" />
              <img src="/tiff/MiniPlayerLikeButton.tiff" />
              <img src="/tiff/MiniPlayerPlaylistClosure.tiff" />
              <img src="/tiff/MiniPlayerNormalModeButtonPressedDark.tiff" />
              <img src="/tiff/MiniPlayerDeleteButtonPressedDark.tiff" />
              <img src="/tiff/MiniPlayerAlbumFoldUpSpread.tiff" />
              <img src="/tiff/YYYMiniPlayerVolumeBarHeader.tiff" />
              <img src="/tiff/MiniPlayerPlaylistButton.tiff" />
              <img src="/tiff/MiniPlayerFastForwardButtonSelected.tiff" />
              <img src="/tiff/MiniPlayerRewindButtonDisabled.tiff" />
              <img src="/tiff/MiniPlayerPlayButtonSelected.tiff" />
              <img src="/tiff/YYYMiniPlayerVolumeBarMax.tiff" />
              <img src="/tiff/MiniPlayerPraiseButtonPressed.tiff" />
              <img src="/tiff/MiniPlayerLyricsButtonActive.tiff" />
              <img src="/tiff/MiniPlayerPauseButtonSelected.tiff" />
              <img src="/tiff/MiniPlayerNormalModeButtonPressed.tiff" />
              <img src="/tiff/MiniPlayerPauseButton.tiff" />
              <img src="/tiff/MiniPlayerDislikeButtonDark.tiff" />
              <img src="/tiff/MiniPlayerCloseButtonPressedDark.tiff" />
              <img src="/tiff/MiniPlayerDeleteButtonDark.tiff" />
              <img src="/tiff/MiniPlayerDeleteButton.tiff" />
              <img src="/tiff/MiniPlayerPlaylistButtonPressed.tiff" />
              <img src="/tiff/MiniPlayerRewindButton.tiff" />
              <img src="/tiff/MiniPlayerVolumeButtonDark.tiff" />
              <img src="/tiff/MiniPlayerDislikeButtonDisabledDark.tiff" />
              <img src="/tiff/YYYMiniPlayerVolumeBarMinDark.tiff" />
              <img src="/tiff/MiniPlayerPraiseButton.tiff" />
              <img src="/tiff/MiniPlayerPraisedButtonDisabled.tiff" />
              <img src="/tiff/MiniPlayerPlaylistClosurePressedDark.tiff" />
              <img src="/tiff/MiniPlayerLargeAlbumDefault.tiff" />
              <img src="/tiff/MiniPlayerLikeButtonPressed.tiff" />
              <img src="/tiff/MiniPlayerPraiseButtonDark.tiff" />
              <img src="/tiff/MiniPlayerDislikeButtonPressed.tiff" />
              <img src="/tiff/MiniPlayerVolumeButtonPressedDark.tiff" />
              <img src="/tiff/MiniPlayerPlayButton.tiff" />
              <img src="/tiff/YYYMiniPlayerVolumeBarMaxDark.tiff" />
              <img src="/tiff/MiniPlayerNormalModeButton.tiff" />
              <img src="/tiff/MiniPlayerVolumeButtonDisabledDark.tiff" />
              <img src="/tiff/MiniPlayerCloseButton.tiff" />
              <img src="/tiff/MiniPlayerPlaylistButtonDisabled.tiff" />
              <img src="/tiff/MiniPlayerPlaylistButtonDark.tiff" />
              <img src="/tiff/MiniPlayerDeleteButtonDisabledDark.tiff" />
              <img src="/tiff/MiniPlayerFastForwardButtonDisabled.tiff" />
              <img src="/tiff/MiniPlayerDeleteButtonPressed.tiff" />
              <img src="/tiff/MiniPlayerDislikeButton.tiff" />
              <img src="/tiff/MiniPlayerLyricsButtonPressed.tiff" />
              <img src="/tiff/MiniPlayerNormalModeButtonDark.tiff" />
              <img src="/tiff/MiniPlayerFastForwardButton.tiff" />
              <img src="/tiff/MiniPlayerAlbumFoldUpButton.tiff" />
              <img src="/tiff/MiniPlayerPlaylistButtonPressedDark.tiff" />
              <img src="/tiff/MiniPlayerDislikeButtonDisabled.tiff" />
              <img src="/tiff/MiniPlayerPauseButtonDisabled.tiff" />
              <img src="/tiff/MiniPlayerRewindButtonSelected.tiff" />
              <img src="/tiff/MiniPlayerPlayButtonDisabled.tiff" />
            </div>
          </div>
        </div>
      </OverlayScrollbarsComponent>
    </div>
  );
});

export default Content;
