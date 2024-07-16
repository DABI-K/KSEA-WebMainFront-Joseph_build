import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { ChartModule } from 'primeng/chart';

import { AppComponent } from './app.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { FooterComponent } from './web/common/footer/footer.component';
import { MainComponent } from './web/main/main.component';
import { NavComponent } from './web/common/nav/nav.component';
import { MissionComponent } from './web/about/mission/mission.component';
import { PresidentMessageComponent } from './web/about/president-message/president-message.component';
import { AboutHeaderComponent } from './web/about/about-header/about-header.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';

import { SponsorComponent } from './web/about/sponsor/sponsor.component';
import { HadbookComponent } from './web/about/handbook/handbook.component';
import { ContactComponent } from './web/about/contact/contact.component';
import { ActivityHeaderComponent } from './web/activity/activity-header/activity-header.component';
import { UkcComponent } from './web/activity/ukc/ukc.component';
import { StepUpComponent } from './web/activity/step-up/step-up.component';
import { NmscComponent } from './web/activity/nmsc/nmsc.component';
import { NewsHeaderComponent } from './web/news/news-header/news-header.component';
import { KseaLetterComponent } from './web/news/ksea-letter/ksea-letter.component';
import { JobOpportunitiesComponent } from './web/news/job-opportunities/job-opportunities.component';
import { MediaComponent } from './web/news/media/media.component';
import { MembershipComponent } from './user/membership/membership.component';
import { HttpClientModule } from '@angular/common/http';
import { MembershipRegularPaymentComponent } from './user/membership/payment/membership-regular-payment/membership-regular-payment.component';
import { MembershipLifetimePaymentComponent } from './user/membership/payment/membership-lifetime-payment/membership-lifetime-payment.component';
import { MembershipSchoolPaymentComponent } from './user/membership/payment/membership-school-payment/membership-school-payment.component';
import { MembershipCancelSubscriptionComponent } from './user/membership/payment/membership-cancel-subscription/membership-cancel-subscription.component';
import { MembershipResumeSubscriptionComponent } from './user/membership/payment/membership-resume-subscription/membership-resume-subscription.component';
import { MembershipChangePaymentMethodComponent } from './user/membership/payment/membership-change-payment-method/membership-change-payment-method.component';
import { IntroductionComponent } from './election/introduction/introduction.component';
import { VotingComponent } from './election/voting/voting.component';
import { BylawsComponent } from './web/ksea-rule/bylaws/bylaws.component';
import { CodeConductComponent } from './web/about/code-conduct/code-conduct.component';
import { PoliciesComponent } from './web/ksea-rule/policies/policies.component';
import { JobOpportunitiesViewComponent } from './web/news/job-opportunities-view/job-opportunities-view.component';

import { MediaViewComponent } from './web/news/media-view/media-view.component';
import { MediaView1Component } from './web/news/media-view1/media-view1.component';
import { MediaView2Component } from './web/news/media-view2/media-view2.component';
import { MediaView3Component } from './web/news/media-view3/media-view3.component';
import { MediaView4Component } from './web/news/media-view4/media-view4.component';
import { MediaView5Component } from './web/news/media-view5/media-view5.component';
import { MediaView6Component } from './web/news/media-view6/media-view6.component';
import { MediaView7Component } from './web/news/media-view7/media-view7.component';
import { MediaView8Component } from './web/news/media-view8/media-view8.component';
import { MediaView9Component } from './web/news/media-view9/media-view9.component';
import { MediaView10Component } from './web/news/media-view10/media-view10.component';
import { MediaView11Component } from './web/news/media-view11/media-view11.component';
import { MediaView12Component } from './web/news/media-view12/media-view12.component';
import { MediaView13Component } from './web/news/media-view13/media-view13.component';
import { MediaView14Component } from './web/news/media-view14/media-view14.component';
import { MediaView15Component } from './web/news/media-view15/media-view15.component';
import { MediaView16Component } from './web/news/media-view16/media-view16.component';
import { MediaView17Component } from './web/news/media-view17/media-view17.component';
import { MediaView18Component } from './web/news/media-view18/media-view18.component';
import { MediaView19Component } from './web/news/media-view19/media-view19.component';
import { MediaView20Component } from './web/news/media-view20/media-view20.component';
import { MediaView21Component } from './web/news/media-view21/media-view21.component';
import { MediaView22Component } from './web/news/media-view22/media-view22.component';
import { MediaView23Component } from './web/news/media-view23/media-view23.component';
import { MediaView24Component } from './web/news/media-view24/media-view24.component';
import { MediaView25Component } from './web/news/media-view25/media-view25.component';
import { MediaView26Component } from './web/news/media-view26/media-view26.component';
import { MediaView27Component } from './web/news/media-view27/media-view27.component';
import { MediaView28Component } from './web/news/media-view28/media-view28.component';
import { MediaView29Component } from './web/news/media-view29/media-view29.component';
import { MediaView30Component } from './web/news/media-view30/media-view30.component';
import { MediaView31Component } from './web/news/media-view31/media-view31.component';
import { MediaView32Component } from './web/news/media-view32/media-view32.component';
import { MediaView33Component } from './web/news/media-view33/media-view33.component';
import { MediaView34Component } from './web/news/media-view34/media-view34.component';
import { MediaView35Component } from './web/news/media-view35/media-view35.component';
import { MediaView36Component } from './web/news/media-view36/media-view36.component';
import { MediaView37Component } from './web/news/media-view37/media-view37.component';
import { MediaView38Component } from './web/news/media-view38/media-view38.component';
import { MediaView39Component } from './web/news/media-view39/media-view39.component';
import { MediaView40Component } from './web/news/media-view40/media-view40.component';
import { MediaView41Component } from './web/news/media-view41/media-view41.component';
import { MediaView42Component } from './web/news/media-view42/media-view42.component';

import { JobView1Component } from './web/news/job-view1/job-view1.component';
import { JobView2Component } from './web/news/job-view2/job-view2.component';
import { JobView3Component } from './web/news/job-view3/job-view3.component';
import { JobView4Component } from './web/news/job-view4/job-view4.component';
import { JobView5Component } from './web/news/job-view5/job-view5.component';
import { JobView6Component } from './web/news/job-view6/job-view6.component';
import { JobView7Component } from './web/news/job-view7/job-view7.component';
import { JobView8Component } from './web/news/job-view8/job-view8.component';
import { JobView9Component } from './web/news/job-view9/job-view9.component';
import { JobView10Component } from './web/news/job-view10/job-view10.component';
import { JobView12Component } from './web/news/job-view12/job-view12.component';
import { JobView13Component } from './web/news/job-view13/job-view13.component';
import { JobView14Component } from './web/news/job-view14/job-view14.component';
import { JobView15Component } from './web/news/job-view15/job-view15.component';
import { JobView16Component } from './web/news/job-view16/job-view16.component';
import { JobView17Component } from './web/news/job-view17/job-view17.component';
import { JobView18Component } from './web/news/job-view18/job-view18.component';
import { JobView19Component } from './web/news/job-view19/job-view19.component';
import { JobView20Component } from './web/news/job-view20/job-view20.component';
import { JobView21Component } from './web/news/job-view21/job-view21.component';
import { JobView22Component } from './web/news/job-view22/job-view22.component';
import { JobView23Component } from './web/news/job-view23/job-view23.component';
import { JobView24Component } from './web/news/job-view24/job-view24.component';
import { JobView25Component } from './web/news/job-view25/job-view25.component';
import { JobView26Component } from './web/news/job-view26/job-view26.component';
import { JobView27Component } from './web/news/job-view27/job-view27.component';
import { JobView28Component } from './web/news/job-view28/job-view28.component';
import { JobView29Component } from './web/news/job-view29/job-view29.component';
import { JobView30Component } from './web/news/job-view30/job-view30.component';
import { JobView31Component } from './web/news/job-view31/job-view31.component';
import { JobView32Component } from './web/news/job-view32/job-view32.component';
import { JobView33Component } from './web/news/job-view33/job-view33.component';
import { JobView34Component } from './web/news/job-view34/job-view34.component';
import { JobView35Component } from './web/news/job-view35/job-view35.component';
import { JobView36Component } from './web/news/job-view36/job-view36.component';
import { JobView37Component } from './web/news/job-view37/job-view37.component';
import { JobView38Component } from './web/news/job-view38/job-view38.component';
import { JobView39Component } from './web/news/job-view39/job-view39.component';
import { JobView40Component } from './web/news/job-view40/job-view40.component';
import { JobView41Component } from './web/news/job-view41/job-view41.component';
import { JobView42Component } from './web/news/job-view42/job-view42.component';
import { JobView43Component } from './web/news/job-view43/job-view43.component';

import { AnnouncementComponent } from './web/news/announcement/announcement.component';
import { AnnouncementView1Component } from './web/news/announcement-view1/announcement-view1.component';
import { AnnouncementView2Component } from './web/news/announcement-view2/announcement-view2.component';
import { AnnouncementView3Component } from './web/news/announcement-view3/announcement-view3.component';
import { AnnouncementView4Component } from './web/news/announcement-view4/announcement-view4.component';
import { AnnouncementView5Component } from './web/news/announcement-view5/announcement-view5.component';
import { AnnouncementView6Component } from './web/news/announcement-view6/announcement-view6.component';
import { AnnouncementView7Component } from './web/news/announcement-view7/announcement-view7.component';
import { AnnouncementView8Component } from './web/news/announcement-view8/announcement-view8.component';

import { AnnouncementView9Component } from './web/news/announcement-view9/announcement-view9.component';
import { AnnouncementView10Component } from './web/news/announcement-view10/announcement-view10.component';
import { AnnouncementView11Component } from './web/news/announcement-view11/announcement-view11.component';
import { AnnouncementView12Component } from './web/news/announcement-view12/announcement-view12.component';
import { AnnouncementView13Component } from './web/news/announcement-view13/announcement-view13.component';
import { AnnouncementView14Component } from './web/news/announcement-view14/announcement-view14.component';
import { AnnouncementView15Component } from './web/news/announcement-view15/announcement-view15.component';
import { AnnouncementView16Component } from './web/news/announcement-view16/announcement-view16.component';
import { AnnouncementView17Component } from './web/news/announcement-view17/announcement-view17.component';
import { AnnouncementView18Component } from './web/news/announcement-view18/announcement-view18.component';
import { AnnouncementView19Component } from './web/news/announcement-view19/announcement-view19.component';
import { AnnouncementView20Component } from './web/news/announcement-view20/announcement-view20.component';
import { AnnouncementView21Component } from './web/news/announcement-view21/announcement-view21.component';
import { AnnouncementView22Component } from './web/news/announcement-view22/announcement-view22.component';
import { AnnouncementView23Component } from './web/news/announcement-view23/announcement-view23.component';
import { AnnouncementView24Component } from './web/news/announcement-view24/announcement-view24.component';
import { AnnouncementView25Component } from './web/news/announcement-view25/announcement-view25.component';
import { AnnouncementView26Component } from './web/news/announcement-view26/announcement-view26.component';
import { AnnouncementView27Component } from './web/news/announcement-view27/announcement-view27.component';
import { AnnouncementView28Component } from './web/news/announcement-view28/announcement-view28.component';
import { AnnouncementView29Component } from './web/news/announcement-view29/announcement-view29.component';
import { AnnouncementView30Component } from './web/news/announcement-view30/announcement-view30.component';
import { AnnouncementView31Component } from './web/news/announcement-view31/announcement-view31.component';
import { AnnouncementView32Component } from './web/news/announcement-view32/announcement-view32.component';
import { AnnouncementView33Component } from './web/news/announcement-view33/announcement-view33.component';
import { AnnouncementView34Component } from './web/news/announcement-view34/announcement-view34.component';
import { AnnouncementView35Component } from './web/news/announcement-view35/announcement-view35.component';
import { AnnouncementView36Component } from './web/news/announcement-view36/announcement-view36.component';
import { AnnouncementView37Component } from './web/news/announcement-view37/announcement-view37.component';
import { AnnouncementView38Component } from './web/news/announcement-view38/announcement-view38.component';
import { AnnouncementView39Component } from './web/news/announcement-view39/announcement-view39.component';
import { AnnouncementView40Component } from './web/news/announcement-view40/announcement-view40.component';
import { AnnouncementView41Component } from './web/news/announcement-view41/announcement-view41.component';
import { AnnouncementView42Component } from './web/news/announcement-view42/announcement-view42.component';
import { AnnouncementView43Component } from './web/news/announcement-view43/announcement-view43.component';
import { AnnouncementView44Component } from './web/news/announcement-view44/announcement-view44.component';
import { AnnouncementView45Component } from './web/news/announcement-view45/announcement-view45.component';
import { AnnouncementView46Component } from './web/news/announcement-view46/announcement-view46.component';
import { AnnouncementView47Component } from './web/news/announcement-view47/announcement-view47.component';
import { AnnouncementView48Component } from './web/news/announcement-view48/announcement-view48.component';
import { AnnouncementView49Component } from './web/news/announcement-view49/announcement-view49.component';
import { AnnouncementView50Component } from './web/news/announcement-view50/announcement-view50.component';
import { AnnouncementView51Component } from './web/news/announcement-view51/announcement-view51.component';
import { AnnouncementView52Component } from './web/news/announcement-view52/announcement-view52.component';
import { AnnouncementView53Component } from './web/news/announcement-view53/announcement-view53.component';
import { AnnouncementView54Component } from './web/news/announcement-view54/announcement-view54.component';
import { AnnouncementView55Component } from './web/news/announcement-view55/announcement-view55.component';
import { AnnouncementView56Component } from './web/news/announcement-view56/announcement-view56.component';
import { AnnouncementView57Component } from './web/news/announcement-view57/announcement-view57.component';
import { AnnouncementView58Component } from './web/news/announcement-view58/announcement-view58.component';
import { AnnouncementView59Component } from './web/news/announcement-view59/announcement-view59.component';
import { AnnouncementView60Component } from './web/news/announcement-view60/announcement-view60.component';
import { AnnouncementView61Component } from './web/news/announcement-view61/announcement-view61.component';
import { AnnouncementView62Component } from './web/news/announcement-view62/announcement-view62.component';
import { AnnouncementView63Component } from './web/news/announcement-view63/announcement-view63.component';
import { AnnouncementView64Component } from './web/news/announcement-view64/announcement-view64.component';
import { AnnouncementView65Component } from './web/news/announcement-view65/announcement-view65.component';
import { AnnouncementView66Component } from './web/news/announcement-view66/announcement-view66.component';
import { AnnouncementView67Component } from './web/news/announcement-view67/announcement-view67.component';
import { AnnouncementView68Component } from './web/news/announcement-view68/announcement-view68.component';
import { AnnouncementView69Component } from './web/news/announcement-view69/announcement-view69.component';
import { AnnouncementView70Component } from './web/news/announcement-view70/announcement-view70.component';
import { AnnouncementView71Component } from './web/news/announcement-view71/announcement-view71.component';
import { AnnouncementView72Component } from './web/news/announcement-view72/announcement-view72.component';
import { AnnouncementView73Component } from './web/news/announcement-view73/announcement-view73.component';
import { AnnouncementView74Component } from './web/news/announcement-view74/announcement-view74.component';
import { AnnouncementView75Component } from './web/news/announcement-view75/announcement-view75.component';
import { AnnouncementView76Component } from './web/news/announcement-view76/announcement-view76.component';
import { AnnouncementView77Component } from './web/news/announcement-view77/announcement-view77.component';
import { AnnouncementView78Component } from './web/news/announcement-view78/announcement-view78.component';
import { AnnouncementView79Component } from './web/news/announcement-view79/announcement-view79.component';
import { AnnouncementView80Component } from './web/news/announcement-view80/announcement-view80.component';
import { AnnouncementView81Component } from './web/news/announcement-view81/announcement-view81.component';
import { AnnouncementView82Component } from './web/news/announcement-view82/announcement-view82.component';
import { AnnouncementView83Component } from './web/news/announcement-view83/announcement-view83.component';
import { AnnouncementView84Component } from './web/news/announcement-view84/announcement-view84.component';
import { AnnouncementView85Component } from './web/news/announcement-view85/announcement-view85.component';
import { AnnouncementView86Component } from './web/news/announcement-view86/announcement-view86.component';
import { AnnouncementView87Component } from './web/news/announcement-view87/announcement-view87.component';
import { AnnouncementView88Component } from './web/news/announcement-view88/announcement-view88.component';
import { AnnouncementView89Component } from './web/news/announcement-view89/announcement-view89.component';
import { AnnouncementView90Component } from './web/news/announcement-view90/announcement-view90.component';
import { AnnouncementView91Component } from './web/news/announcement-view91/announcement-view91.component';
import { AnnouncementView92Component } from './web/news/announcement-view92/announcement-view92.component';
import { AnnouncementView93Component } from './web/news/announcement-view93/announcement-view93.component';
import { AnnouncementView94Component } from './web/news/announcement-view94/announcement-view94.component';
import { AnnouncementView95Component } from './web/news/announcement-view95/announcement-view95.component';
import { AnnouncementView96Component } from './web/news/announcement-view96/announcement-view96.component';
import { AnnouncementView97Component } from './web/news/announcement-view97/announcement-view97.component';
import { AnnouncementView98Component } from './web/news/announcement-view98/announcement-view98.component';
import { AnnouncementView99Component } from './web/news/announcement-view99/announcement-view99.component';


import { VotingResultComponent } from './election/voting-result/voting-result.component';

import { AboutMembershipComponent } from './web/membership/about-membership/about-membership.component';
import { MembershipHeaderComponent } from './web/membership/membership-header/membership-header.component';

import { SeedComponent } from './web/activity/seed/seed.component';
import { KatalystComponent } from './web/activity/katalyst/katalyst.component';
import { ImpactsComponent } from './web/activity/impacts/impacts.component';
import { ScholarshihpComponent } from './web/award/scholarship/scholarship.component';
import { YigComponent } from './web/award/yig/yig.component';
import { HacComponent } from './web/award/hac/hac.component';
import { AwardHeaderComponent } from './web/award/award-header/award-header.component';
import { NgxStripeModule } from 'ngx-stripe';

import { environment } from '../environments/environment';

import { OrganizationHeaderComponent } from './web/organization/organization-header/organization-header.component';
import { LeadershipComponent } from './web/organization/leadership/leadership.component';
import { TechnicalGComponent } from './web/organization/technical-g/technical-g.component';
import { FormerPresidentsComponent } from './web/organization/former-presidents/former-presidents.component';
import { LcpcComponent } from './web/organization/lcpc/lcpc.component';
import { CouncilorsComponent } from './web/organization/councilors/councilors.component';
import { YgGComponent } from './web/organization/yg-g/yg-g.component';
import { AffiliatedProfessionalComponent } from './web/organization/affiliated-professional/affiliated-professional.component';
import { CommitteeComponent } from './web/organization/committee/committee.component';
import { LoadDataComponent } from './load-data/load-data.component';

import { FormerContactListComponent } from './web/organization/former-contact-list/former-contact-list.component';

import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { EmailComponent } from './admin/email/email.component';
import { DonationPaymentComponent } from './user/membership/payment/donation-payment/donation-payment.component';
import { ApplyScholarshipApplicationComponent } from './web/award/scholarship/apply-scholarship-application/apply-scholarship-application.component';

import { KeyGenComponent } from './election/key-gen/key-gen.component';
import { MonitorComponent } from './election/monitor/monitor.component';

import { NgChartsModule } from 'ng2-charts';
import { KeyholderComponent } from './election/keyholder/keyholder.component';
import { C4pComponent } from './web/activity/ukc/c4p/c4p.component';

import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewComponent } from './web/activity/ukc/review/review.component';
import { UserInfoComponent } from './admin/user-info/user-info.component';
import { JobView11Component } from './web/news/job-view11/job-view11.component';
import { ScholarshipMonitorComponent } from './web/award/scholarship/admin/scholarship-monitor/scholarship-monitor.component';
import { UkcSigninComponent } from './web/activity/ukc/ukc-signin/ukc-signin.component';
import { UkcSignupComponent } from './web/activity/ukc/ukc-signup/ukc-signup.component';
import { RegistrationComponent } from './web/activity/ukc/registration/registration.component';
import { UkcMonitorComponent } from './web/activity/ukc/ukc-monitor/ukc-monitor.component';
import { UkcRegisterationListComponent } from './web/activity/ukc/ukc-registeration-list/ukc-registeration-list.component';
import { DonationComponent } from './mobile/donation/donation.component';
import { DonationHeaderComponent } from './mobile/donation-header/donation-header.component';

import { Ukc2023NameTagComponent } from './ukc2023-name-tag/ukc2023-name-tag.component';
import { ApplyYigApplicationComponent } from './web/award/yig/apply-yig-application/apply-yig-application.component';
import { YigMonitorComponent } from './web/award/yig/yig-monitor/yig-monitor.component';
import { AdminComponent } from './admin/admin.component';
import { RecommenderComponent } from './web/award/scholarship/recommender/recommender.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SignInComponent,
    SignUpComponent,
    FooterComponent,
    MainComponent,
    NavComponent,
    MissionComponent,
    PresidentMessageComponent,
    AboutHeaderComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    CommitteeComponent,
    SponsorComponent,
    HadbookComponent,
    ContactComponent,
    ActivityHeaderComponent,
    UkcComponent,
    StepUpComponent,
    NmscComponent,
    NewsHeaderComponent,
    KseaLetterComponent,
    JobOpportunitiesComponent,
    MediaComponent,
    MembershipComponent,
    MembershipRegularPaymentComponent,
    MembershipLifetimePaymentComponent,
    MembershipSchoolPaymentComponent,
    MembershipCancelSubscriptionComponent,
    MembershipResumeSubscriptionComponent,
    MembershipChangePaymentMethodComponent,
    IntroductionComponent,
    VotingComponent,
    PoliciesComponent,
    BylawsComponent,
    CodeConductComponent,
    JobOpportunitiesViewComponent,
    MediaViewComponent,
    JobView2Component,
    JobView3Component,
    JobView4Component,
    JobView5Component,
    JobView6Component,
    JobView7Component,
    JobView8Component,
    JobView9Component,
    JobView10Component,
    JobView1Component,
    VotingResultComponent,
    MediaView1Component,
    MediaView2Component,
    MediaView3Component,
    MediaView4Component,
    MediaView5Component,
    MediaView6Component,
    MediaView7Component,
    MediaView8Component,
    MediaView9Component,
    AboutMembershipComponent,
    MembershipHeaderComponent,
    SeedComponent,
    KatalystComponent,
    ImpactsComponent,
    ScholarshihpComponent,
    YigComponent,
    HacComponent,
    AwardHeaderComponent,
    LeadershipComponent,
    OrganizationHeaderComponent,
    TechnicalGComponent,
    FormerPresidentsComponent,
    LcpcComponent,
    CouncilorsComponent,
    YgGComponent,
    AffiliatedProfessionalComponent,
    LoadDataComponent,
    FormerContactListComponent,
    EmailComponent,
    DonationPaymentComponent,
    AnnouncementComponent,
    AnnouncementView1Component,
    AnnouncementView2Component,
    AnnouncementView3Component,
    AnnouncementView4Component,
    AnnouncementView5Component,
    AnnouncementView6Component,
    AnnouncementView7Component,
    AnnouncementView8Component,
    AnnouncementView9Component,
    AnnouncementView10Component,
    AnnouncementView11Component,
    AnnouncementView12Component,
    ApplyScholarshipApplicationComponent,
    AnnouncementView13Component,
    AnnouncementView14Component,
    AnnouncementView15Component,
    AnnouncementView16Component,
    KeyGenComponent,
    MonitorComponent,
    AnnouncementView17Component,
    AnnouncementView18Component,
    KeyholderComponent,
    C4pComponent,
    ReviewComponent,
    UserInfoComponent,
    AnnouncementView19Component,
    AnnouncementView20Component,
    JobView11Component,
    ScholarshipMonitorComponent,
    UkcSigninComponent,
    UkcSignupComponent,
    AnnouncementView21Component,
    AnnouncementView22Component,
    AnnouncementView23Component,
    AnnouncementView24Component,
    AnnouncementView25Component,
    JobView12Component,
    AnnouncementView26Component,
    AnnouncementView27Component,
    AnnouncementView28Component,
    JobView13Component,
    JobView14Component,
    AnnouncementView29Component,
    AnnouncementView30Component,
    AnnouncementView31Component,
    AnnouncementView32Component,
    AnnouncementView33Component,
    AnnouncementView34Component,
    AnnouncementView35Component,
    AnnouncementView36Component,
    JobView15Component,
    AnnouncementView37Component,
    JobView16Component,
    JobView17Component,
    AnnouncementView38Component,
    MediaView10Component,
    MediaView11Component,
    MediaView12Component,
    MediaView13Component,
    MediaView14Component,
    MediaView15Component,
    MediaView16Component,
    MediaView17Component,
    AnnouncementView39Component,
    AnnouncementView40Component,
    AnnouncementView41Component,
    JobView18Component,
    JobView19Component,
    JobView20Component,
    JobView21Component,
    JobView22Component,
    RegistrationComponent,
    AnnouncementView42Component,
    JobView23Component,
    JobView24Component,
    UkcMonitorComponent,
    UkcRegisterationListComponent,
    MediaView18Component,
    AnnouncementView43Component,
    AnnouncementView44Component,
    AnnouncementView45Component,
    AnnouncementView46Component,
    DonationComponent,
    DonationHeaderComponent,
    AnnouncementView47Component,
    AnnouncementView48Component,
    AnnouncementView49Component,
    AnnouncementView50Component,
    AnnouncementView51Component,
    AnnouncementView52Component,
    AnnouncementView53Component,
    Ukc2023NameTagComponent,
    AnnouncementView54Component,
    AnnouncementView55Component,
    AnnouncementView56Component,
    MediaView19Component,
    AnnouncementView57Component,
    MediaView20Component,
    MediaView21Component,
    MediaView22Component,
    MediaView23Component,
    MediaView24Component,
    MediaView25Component,
    JobView25Component,
    AnnouncementView58Component,
    JobView26Component,
    AnnouncementView59Component,
    AnnouncementView60Component,
    JobView27Component,
    MediaView26Component,
    MediaView27Component,
    MediaView28Component,
    AnnouncementView61Component,
    AnnouncementView62Component,
    JobView28Component,
    JobView29Component,
    ApplyYigApplicationComponent,
    YigMonitorComponent,
    AnnouncementView63Component,
    MediaView29Component,
    AnnouncementView64Component,
    AnnouncementView65Component,
    AnnouncementView66Component,
    AnnouncementView67Component,
    JobView30Component,
    AdminComponent,
    RecommenderComponent,
    JobView31Component,
    JobView32Component,
    AnnouncementView68Component,
    AnnouncementView69Component,
    JobView33Component,
    AnnouncementView70Component,
    AnnouncementView71Component,
    JobView34Component,
    JobView35Component,
    AnnouncementView72Component,
    AnnouncementView73Component,
    AnnouncementView74Component,
    AnnouncementView75Component,
    AnnouncementView76Component,
    AnnouncementView77Component,
    AnnouncementView78Component,
    AnnouncementView79Component,
    AnnouncementView80Component,
    AnnouncementView81Component,
    MediaView30Component,
    AnnouncementView82Component,
    AnnouncementView83Component,
    JobView36Component,
    JobView37Component,
    AnnouncementView84Component,
    JobView38Component,
    AnnouncementView85Component,
    AnnouncementView86Component,
    AnnouncementView87Component,
    JobView39Component,
    AnnouncementView88Component,
    AnnouncementView89Component,
    AnnouncementView90Component,
    AnnouncementView91Component,
    AnnouncementView92Component,
    JobView40Component,
    JobView41Component,
    MediaView31Component,
    MediaView32Component,
    MediaView33Component,
    MediaView34Component,
    MediaView35Component,
    MediaView36Component,
    MediaView37Component,
    MediaView38Component,
    MediaView39Component,
    MediaView40Component,
    MediaView41Component,
    MediaView42Component,
    AnnouncementView93Component,
    AnnouncementView94Component,
    AnnouncementView95Component,
    JobView42Component,
    JobView43Component,
    AnnouncementView96Component,
    AnnouncementView97Component,
    AnnouncementView98Component,
    AnnouncementView99Component,

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxStripeModule.forRoot(environment.stripe.publishableKey),
    AppRoutingModule,
    ChartModule,
    EditorModule,
    NgChartsModule,
    TableModule,
    AccordionModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    SelectButtonModule,
    DividerModule,
    SplitterModule,
    DropdownModule,
    ToastModule,
    ConfirmDialogModule,
    InputMaskModule,
    FieldsetModule,
    CardModule,
    ProgressBarModule,
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
