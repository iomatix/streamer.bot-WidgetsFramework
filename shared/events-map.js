import * as Twitch from "./events/twitch/index.js";
import * as Kick from "./events/kick/index.js";
import * as YouTube from "./events/youtube/index.js";
import * as Kofi from "./events/kofi/index.js";
import * as StreamElements from "./events/streamelements/index.js";
import * as Streamlabs from "./events/streamlabs/index.js";
import * as Patreon from "./events/patreon/index.js";
import * as Tipeee from "./events/tipeee/index.js";   
import * as Fourthwall from "./events/fourthwall/index.js";
import * as CrowdControl from "./events/crowdcontrol/index.js";
import * as DonorDrive from "./events/donordrive/index.js";
import * as TreatStream from "./events/treatstream/index.js";
import * as TikTok from "./events/tiktok/index.js";
import * as Streamloots from "./events/streamloots/index.js";

export const eventsMap = {
    "Twitch.Follow": Twitch.TwitchFollowAdapter,
    "Twitch.Cheer": Twitch.TwitchCheerAdapter,
    "Twitch.Sub": Twitch.TwitchSubAdapter,
    "Twitch.ReSub": Twitch.TwitchResubAdapter,
    "Twitch.GiftSub": Twitch.TwitchGiftSubAdapter,
    "Twitch.GiftBomb": Twitch.TwitchGiftBombAdapter,
    "Twitch.RewardRedemption": Twitch.TwitchRewardRedemptionAdapter,
    "Twitch.Raid": Twitch.TwitchRaidAdapter,
    "Twitch.WatchStreak": Twitch.TwitchWatchStreakAdapter,
    "Twitch.ChatMessage": Twitch.TwitchChatMessageAdapter,
    "Twitch.FirstWords": Twitch.TwitchFirstWordsAdapter,

    "Kick.Follow": Kick.KickFollowAdapter,
    "Kick.Subscription": Kick.KickSubscriptionAdapter,
    "Kick.Resubscription": Kick.KickResubscriptionAdapter,
    "Kick.GiftSubscription": Kick.KickGiftSubscriptionAdapter,
    "Kick.MassGiftSubscription": Kick.KickMassGiftSubscriptionAdapter,
    "Kick.KicksGifted": Kick.KickKicksGiftedAdapter,
    "Kick.RewardRedemption": Kick.KickRewardRedemptionAdapter,
    "Kick.ChatMessage": Kick.KickChatMessageAdapter,
    "Kick.FirstWords": Kick.KickFirstWordsAdapter,

    "YouTube.SuperChat": YouTube.YouTubeSuperChatAdapter,
    "YouTube.SuperSticker": YouTube.YouTubeSuperStickerAdapter,
    "YouTube.NewSponsor": YouTube.YouTubeNewSponsorAdapter,
    "YouTube.GiftMembershipReceived": YouTube.YouTubeGiftMembershipReceivedAdapter,

    "Streamlabs.Donation": Streamlabs.StreamlabsDonationAdapter,
    "StreamElements.Tip": StreamElements.StreamElementsTipAdapter,
    "StreamElements.Merch": StreamElements.StreamElementsMerchAdapter,

    "Patreon.PledgeCreated": Patreon.PatreonPledgeCreatedAdapter,

    "Kofi.Donation": Kofi.KofiDonationAdapter,
    "Kofi.Subscription": Kofi.KofiSubscriptionAdapter,
    "Kofi.Resubscription": Kofi.KofiResubscriptionAdapter,
    "Kofi.ShopOrder": Kofi.KofiShopOrderAdapter,
    "Kofi.Commission": Kofi.KofiCommissionAdapter,

    "TipeeeStream.Donation": Tipeee.TipeeeStreamDonationAdapter,

    "Fourthwall.OrderPlaced": Fourthwall.FourthwallOrderPlacedAdapter,
    "Fourthwall.Donation": Fourthwall.FourthwallDonationAdapter,
    "Fourthwall.SubscriptionPurchased": Fourthwall.FourthwallSubscriptionPurchasedAdapter,
    "Fourthwall.GiftPurchase": Fourthwall.FourthwallGiftPurchaseAdapter,
    "Fourthwall.GiftDrawStarted": Fourthwall.FourthwallGiftDrawStartedAdapter,
    "Fourthwall.GiftDrawEnded": Fourthwall.FourthwallGiftDrawEndedAdapter,

    "CrowdControl.EffectRequest": CrowdControl.CrowdControlEffectRequestAdapter,
    "CrowdControl.EffectSuccess": CrowdControl.CrowdControlEffectSuccessAdapter,
    "CrowdControl.EffectFailure": CrowdControl.CrowdControlEffectFailureAdapter,
    "CrowdControl.CoinExchange": CrowdControl.CrowdControlCoinExchangeAdapter,
    "CrowdControl.GameSessionStart": CrowdControl.CrowdControlGameSessionStartAdapter,
    "CrowdControl.GameSessionEnd": CrowdControl.CrowdControlGameSessionEndAdapter,
    "CrowdControl.TimedEffectStarted": CrowdControl.CrowdControlTimedEffectStartedAdapter,
    "CrowdControl.TimedEffectEnded": CrowdControl.CrowdControlTimedEffectEndedAdapter,
    "CrowdControl.TimedEffectUpdate": CrowdControl.CrowdControlTimedEffectUpdateAdapter,

    "DonorDrive.Donation": DonorDrive.DonorDriveDonationAdapter,
    "DonorDrive.Incentive": DonorDrive.DonorDriveIncentiveAdapter,

    "TreatStream.Treat": TreatStream.TreatStreamTreatAdapter,

    "TikTok.Gift": TikTok.TikTokGiftAdapter,
    "TikTok.Subscribe": TikTok.TikTokSubscribeAdapter,

    "Streamloots.CardRedeemed": Streamloots.StreamlootsCardRedeemedAdapter,
    "Streamloots.PackPurchased": Streamloots.StreamlootsPackPurchasedAdapter,
    "Streamloots.ChestPurchased": Streamloots.StreamlootsChestPurchasedAdapter,
    "Streamloots.Tip": Streamloots.StreamlootsTipAdapter,
    "Streamloots.Subscription": Streamloots.StreamlootsSubscriptionAdapter,
};