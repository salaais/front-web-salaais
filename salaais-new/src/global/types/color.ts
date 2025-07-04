import { makeEnum } from "../utils/enum";

export const Color = makeEnum({
    TxtPrimary: "var(--txt-primary)",
    TxtSecondary: "var(--txt-secondary)",
    TxtTertiary: "var(--txt-tertiary)",
    TxtTitle: "var(--txt-title)",
    TxtSolid: "var(--txt-solid)",
    ButtonTxt: "var(--button-txt)",
    Link: "var(--link)",

    Primary: "var(--primary-color)",
    Secondary: "var(--secondary-color)",
    Tertiary: "var(--tertiary-color)",
    Success: "var(--success-color)",
    DangerPrimary: "var(--danger-primary)",
    DangerSecondary: "var(--danger-secondary)",
    Warning: "var(--warning-color)",
    Info: "var(--info-color)",
    Admin: "var(--admin-color)",
    AdminSecondary: "var(--admin-secondary-color)",
    Light: "var(--light-color)",
    Dark: "var(--dark-color)",
    FollowButtonColor: "var(--follow-button-color)",

    BgPrimary: "var(--bg-primary)",
    BgSecondary: "var(--bg-secondary)",
    BgTertiary: "var(--bg-tartiary)",
    BgPrimaryTable: "var(--bg-primary-table-color)",
    BgSecondaryTable: "var(--bg-secondary-table-color)",

    Green: "var(--green)",
    Red: "var(--red)",
    Blue: "var(--blue)",
    DarkGreen: "var(--dark-green)",
    Purple: "var(--purple)",
    Yellow: "var(--yellow)",
    Pink: "var(--pink)",
    Orange: "var(--orange)",

    Shadow: "var(--shadow)",

    MsgSend: "var(--msg-send)",
    AchievementComum: "var(--achievement-comum)",
    AchievementRare: "var(--achievement-rare)",
    AchievementRaroBackground: "var(--achievement-rare-background)",
    AchievementLendarioBackground: "var(--achievement-legendary-background)",
    AchievementDisabled: "var(--achievement-disabled)",

    InstagramColor: "var(--instagram_color)",
    FacebookColor: "var(--facebook_color)",

    PlanPrimaryColor: "var(--plan-primary-color)",
    PlanBackgroundImageColor: "var(--plan-background-image)",
    PlanButtonTextColor: "var(--plan-button-text-color)",
    PlanTitleColor: "var(--plan-title-color)",
    PlanTextColor: "var(--plan-text-color)",
})
