import React from 'react';
const DocEditor = () => {
    return (
        <div class="shadow-inner flex p-4 gap-10 justify-between bg-red-200">
        <div class="u-align-left u-clearfix u-sheet u-valign-middle u-sheet-1">
        <nav class="u-menu u-menu-dropdown u-offcanvas u-menu-1">
          <div class="menu-collapse">
            <a class="place-self-auto u-button-style u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-text-active-color u-custom-text-hover-color u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="#">
              <defs><symbol id="menu-hamburger" viewBox="0 0 16 16"><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect>
</symbol>
</defs>
            </a>
          </div>
          <div class="self-auto u-custom-menu u-nav-container w-128">
            <ul class="u-nav u-unstyled u-nav-1"><li class="u-nav-item"><a class="u-button-style u-nav-link u-text-active-custom-color-7 u-text-hover-custom-color-2" href="Home.html">Home</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link u-text-active-custom-color-7 u-text-hover-custom-color-2" href="Create-Poem.html">Create Poem</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link u-text-active-custom-color-7 u-text-hover-custom-color-2" href="Collaborate.html">Collaborate</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link u-text-active-custom-color-7 u-text-hover-custom-color-2" href="Profile.html">Profile</a>
</li></ul>
          </div>
          <div class="u-custom-menu u-nav-container-collapse">
            <div class="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
              <div class="u-inner-container-layout u-sidenav-overflow">
                <div class="u-menu-close"></div>
                <ul class="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2 p-px"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="Home.html">Home</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="Create-Poem.html">Create Poem</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="Collaborate.html">Collaborate</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="Profile.html">Profile</a>
</li></ul>
              </div>
            </div>
            <div class="u-black u-menu-overlay u-opacity u-opacity-70"></div>
          </div>
        </nav>
      </div>
      <div class="u-clearfix u-sheet u-sheet-1"/>
        <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
          <div class="u-layout">
            <div class="u-layout-row">
              <div class="u-container-style p1-0 u-layout-cell u-left-cell u-radius-18 u-shape-round u-size-43 u-size-xs-60 u-white u-layout-cell-1" src="">
                <div class="u-container-layout u-container-layout-1">
                  <h2 class=" u-align-center u-text u-text-default u-text-1">Poem Title <span>with Collaborator's Name</span>
                  </h2>
                  <p class="u-align-center u-text u-text-2">Feel free to type below. The color you are assigned to is:<br/>
                    <span class="u-text-custom-color-2"></span>
                  </p>
                  <h5 class="u-align-center u-text u-text-custom-color-2 u-text-3" data-animation-name="pulse" data-animation-duration="1000" data-animation-delay="0" data-animation-direction=""> &lt;color&gt;</h5>
                  <div class="u-border-5 u-border-custom-color-5 u-custom-color-3 u-radius-15 u-shape u-shape-round u-shape-1" data-animation-name="zoomIn" data-animation-duration="1000" data-animation-delay="0" data-animation-direction=""></div>
                  <div class="u-border-5 u-border-custom-color-2 u-custom-color-6 u-radius-15 u-shape u-shape-round u-shape-2" data-animation-name="zoomIn" data-animation-duration="1000" data-animation-delay="1000" data-animation-direction=""></div>
                  <div class="u-border-1 u-border-custom-color-2 u-container-style u-group u-radius-26 u-shape-round u-group-1" data-animation-name="zoomIn" data-animation-duration="1000" data-animation-delay="1500" data-animation-direction="">
                    <div class="u-container-layout u-container-layout-2">
                      <p class="self-start u-text u-text-default u-text-4 p-13">Poem in Progress will be displayed here:<br></br>
                        <span class="u-text-custom-color-1">This is a haiku <br></br></span>
                        <span class="u-text-custom-color-2">Everybody loves haikus!<br></br></span>
                        <br/>
                        <span class="u-text-custom-color-1">But they are boring</span>
                      </p>
                    </div>
                  </div>
                  <a href="https://github.com/acm-projects/Poetic" class="u-border-2 u-border-hover-palette-1-base u-border-palette-1-base u-btn u-btn-round u-button-style u-hover-palette-1-base u-none u-radius-50 u-text-active-palette-1-light-2 u-text-custom-color-1 u-text-hover-white u-btn-1">End Turn</a>
                </div>
              </div>
              <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-17 u-size-xs-60 u-layout-cell-2" src="">
                <div class="u-container-layout u-valign-top u-container-layout-3" src="">
                  <div class="u-container-style u-custom-color-4 u-group u-radius-15 u-shape-round u-group-2">
                    <div class="u-container-layout u-container-layout-4">
                      <h2 class="u-align-center u-text u-text-default u-text-5">Contributors</h2>
                      <div class="u-border-3 u-border-grey-dark-1 u-line u-line-horizontal u-opacity u-opacity-60 u-line-1"></div>
                      <h4 class="w-128 u-align-center u-text u-text-default u-text-6">Contributor 1:</h4><span class="u-icon u-icon-circle u-text-palette-1-base u-icon-1" data-animation-name="bounceIn" data-animation-duration="1000" data-animation-delay="1000" data-animation-direction=""></span>
                      <h5 class="u-text u-text-default u-text-7">Name</h5>
                      <p class="u-text u-text-default u-text-8">Description</p>
                      <h4 class="u-align-center u-text u-text-default u-text-9">Contributor 2:</h4><span class="u-icon u-icon-circle u-text-palette-1-base u-icon-2" data-animation-name="bounceIn" data-animation-duration="1000" data-animation-delay="1000" data-animation-direction=""></span>
                      <h5 class="u-text u-text-default u-text-10">Name</h5>
                      <p class="u-text u-text-default u-text-11">Description</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a href="https://github.com/acm-projects/Poetic" class="u-active-custom-color-5 u-border-2 u-border-hover-palette-1-base u-border-palette-1-base u-btn u-btn-round u-button-style u-hover-palette-1-base u-radius-50 u-text-active-palette-1-light-2 u-text-custom-color-1 u-text-hover-white u-white u-btn-2">Submit Poem &lt;1/2&gt;</a>
      </div>
);     
}

export default DocEditor;