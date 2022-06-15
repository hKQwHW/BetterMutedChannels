/**
 * @name BetterMutedChannels
 * @version 0.0.1
 * @description Gives a more visible icon to muted channels
 * @author confusingarabicname
 */

 module.exports = class BetterMutedChannels {
    start() {
        // Required function. Called when the plugin is activated (including after reloads)

        /*
        the css snippet is from carrot#8812 in the betterdiscord #css-snippets channel, but i changed it a bit because new discord versions broke it
        */
        BdApi.injectCSS('BetterMutedChannels', `
        .modeMuted-2T4MDZ .icon-2W8DHg path { display: none; }
        .modeMuted-2T4MDZ .iconContainer-21RCa3 { position:relative; }
        .modeMuted-2T4MDZ .iconContainer-21RCa3:before {
            content: '🔇';
            position: absolute;
            font-size: 20px; 
        }

        .muted-channel-icon .icon-2W8DHg path { display: none; }
        .muted-channel-icon .iconContainer-21RCa3 { position:relative; }
        .muted-channel-icon .iconContainer-21RCa3:before {
            content: '🔇';
            position: absolute;
            font-size: 20px; 
        }

        .modeSelected-3DmyhH, .muted-channel-icon > div > a > .name-28HaxV > .channelName-3KPsGw {
            color:rgb(208 208 208)!important;
            /*
            this will overwrite the white selected highlight for the muted channel
            but add a different highlight so that its still noticeable as the selected channel
            */
        }
        `)
    }

    stop() {
        // Required function. Called when the plugin is deactivated
        document.getElementById("BetterMutedChannels")?.remove?.()  // ty Doggybootsy on the bd server for this, its easier than a try-catch but wont throw an error if the style is already gone
    }

    onSwitch() {
        // called when the user switches to different channels, dms, etc.
        if (
            location.href.includes("/channels") &&
            document.querySelector(".toolbar-3_r2xA .strikethrough-958bun")
        ) { 
            // if theres a strikethrough in the toolbar that means the channel is muted, so we add the muted-channel-icon class in order to 
            // add the more visible muted icon and change the channel highlight color
            var selectedChannel = document.querySelector(".modeSelected-3DmyhH"); 
            selectedChannel.className = selectedChannel.className + " muted-channel-icon";
        }
    }
}
