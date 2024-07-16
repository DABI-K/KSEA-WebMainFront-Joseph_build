import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './user/profile/profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { MainComponent } from './web/main/main.component';
import { MissionComponent } from './web/about/mission/mission.component';
import { PresidentMessageComponent } from './web/about/president-message/president-message.component';
import { CommitteeComponent } from './web/organization/committee/committee.component';
import { SponsorComponent } from './web/about/sponsor/sponsor.component';
import { HadbookComponent } from './web/about/handbook/handbook.component';
import { ContactComponent } from './web/about/contact/contact.component';
import { UkcComponent } from './web/activity/ukc/ukc.component';
import { StepUpComponent } from './web/activity/step-up/step-up.component';
import { NmscComponent } from './web/activity/nmsc/nmsc.component';
import { KseaLetterComponent } from './web/news/ksea-letter/ksea-letter.component';
import { JobOpportunitiesComponent } from './web/news/job-opportunities/job-opportunities.component';

import { MediaComponent } from './web/news/media/media.component';
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

import { JobOpportunitiesViewComponent } from './web/news/job-opportunities-view/job-opportunities-view.component';
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
import { JobView11Component } from './web/news/job-view11/job-view11.component';
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

import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { MembershipComponent } from './user/membership/membership.component';
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
import { VotingResultComponent } from './election/voting-result/voting-result.component';
import { AboutMembershipComponent } from './web/membership/about-membership/about-membership.component';

import { SeedComponent } from './web/activity/seed/seed.component';
import { KatalystComponent } from './web/activity/katalyst/katalyst.component';
import { ImpactsComponent } from './web/activity/impacts/impacts.component';

import { ScholarshihpComponent } from './web/award/scholarship/scholarship.component';
import { YigComponent } from './web/award/yig/yig.component';
import { HacComponent } from './web/award/hac/hac.component';

import { LeadershipComponent } from './web/organization/leadership/leadership.component';
import { TechnicalGComponent } from './web/organization/technical-g/technical-g.component';
import { FormerPresidentsComponent } from './web/organization/former-presidents/former-presidents.component';
import { LcpcComponent } from './web/organization/lcpc/lcpc.component';
import { CouncilorsComponent } from './web/organization/councilors/councilors.component';
import { YgGComponent } from './web/organization/yg-g/yg-g.component';
import { AffiliatedProfessionalComponent } from './web/organization/affiliated-professional/affiliated-professional.component';
import { LoadDataComponent } from './load-data/load-data.component';

import { FormerContactListComponent } from './web/organization/former-contact-list/former-contact-list.component';
import { EmailComponent } from './admin/email/email.component';
import { DonationPaymentComponent } from './user/membership/payment/donation-payment/donation-payment.component';
import { ApplyScholarshipApplicationComponent } from './web/award/scholarship/apply-scholarship-application/apply-scholarship-application.component';
import { KeyGenComponent } from './election/key-gen/key-gen.component';
import { MonitorComponent } from './election/monitor/monitor.component';
import { KeyholderComponent } from './election/keyholder/keyholder.component';
import { C4pComponent } from './web/activity/ukc/c4p/c4p.component';
import { ReviewComponent } from './web/activity/ukc/review/review.component';
import { UserInfoComponent } from './admin/user-info/user-info.component';
import { ScholarshipMonitorComponent } from './web/award/scholarship/admin/scholarship-monitor/scholarship-monitor.component';
import { UkcSigninComponent } from './web/activity/ukc/ukc-signin/ukc-signin.component';
import { UkcSignupComponent } from './web/activity/ukc/ukc-signup/ukc-signup.component';
import { RegistrationComponent } from './web/activity/ukc/registration/registration.component';
import { UkcMonitorComponent } from './web/activity/ukc/ukc-monitor/ukc-monitor.component';
import { UkcRegisterationListComponent } from './web/activity/ukc/ukc-registeration-list/ukc-registeration-list.component';

import { DonationComponent } from './mobile/donation/donation.component';

import { Ukc2023NameTagComponent } from './ukc2023-name-tag/ukc2023-name-tag.component';
import { ApplyYigApplicationComponent } from './web/award/yig/apply-yig-application/apply-yig-application.component';
import { YigMonitorComponent } from './web/award/yig/yig-monitor/yig-monitor.component';
import { AdminComponent } from './admin/admin.component';
import { RecommenderComponent } from './web/award/scholarship/recommender/recommender.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'main',
  //   pathMatch: 'full',
  // },
  {
    path: 'ukc-nametag',
    component: Ukc2023NameTagComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'admin/email',
    component: EmailComponent,
  },
  {
    path: 'admin/user-info',
    component: UserInfoComponent,
  },
  {
    path: 'load',
    component: LoadDataComponent,
  },
  {
    path: 'hac',
    component: HacComponent,
  },
  {
    path: 'yig',
    component: YigComponent,
  },
  {
    path: 'yigApply',
    component: ApplyYigApplicationComponent,
  },
  {
    path: 'yigMonitor',
    component: YigMonitorComponent,
  },
  {
    path: 'scholarship',
    component: ScholarshihpComponent,
  },
  {
    path: 'scholarshipApply',
    component: ApplyScholarshipApplicationComponent,
  },
  {
    path: 'scholarshipRecommender',
    component: RecommenderComponent,
  },
  {
    path: 'scholarship-monitor',
    component: ScholarshipMonitorComponent,
  },
  {
    path: 'voting-result',
    component: VotingResultComponent,
  },
  {
    path: 'key-gen',
    component: KeyGenComponent,
  },
  {
    path: 'voting-monitor',
    component: MonitorComponent,
  },
  {
    path: 'keyholder',
    component: KeyholderComponent,
  },
  {
    path: 'about-membership',
    component: AboutMembershipComponent,
  },
  // {
  //  path: 'voting-2024',
  //  component: IntroductionComponent,
  // },
  // {
  //   path: 'voting',
  //   component: VotingComponent,
  // },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'profile/:tab',
    component: ProfileComponent,
  },
  {
    path: 'membership',
    component: MembershipComponent,
  },
  {
    path: 'membershipRegularPayment',
    component: MembershipRegularPaymentComponent,
  },
  {
    path: 'membershipLifetimePayment',
    component: MembershipLifetimePaymentComponent,
  },
  {
    path: 'membershipSchoolPayment',
    component: MembershipSchoolPaymentComponent,
  },
  {
    path: 'donateKSEA',
    component: DonationPaymentComponent,
  },
  {
    path: 'membershipCancelSubscription',
    component: MembershipCancelSubscriptionComponent,
  },
  {
    path: 'membershipResumeSubscription',
    component: MembershipResumeSubscriptionComponent,
  },
  {
    path: 'membershipChangePaymentMethod',
    component: MembershipChangePaymentMethodComponent,
  },
  {
    path: 'signIn',
    component: SignInComponent,
  },
  {
    path: 'ukc-signIn',
    component: UkcSigninComponent,
  },
  {
    path: 'ukc-signUp',
    component: UkcSignupComponent,
  },
  {
    path: 'ukc-registration',
    component: RegistrationComponent,
  },
  {
    path: 'ukc-monitor',
    component: UkcMonitorComponent,
  },
  {
    path: 'ukc-list',
    component: UkcRegisterationListComponent,
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'mission',
    component: MissionComponent,
  },
  {
    path: 'president',
    component: PresidentMessageComponent,
  },
  {
    path: 'sponsors',
    component: SponsorComponent,
  },
  {
    path: 'handbook',
    component: HadbookComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'leadership',
    component: LeadershipComponent,
  },
  {
    path: 'committee',
    component: CommitteeComponent,
  },
  {
    path: 'technical-g',
    component: TechnicalGComponent,
  },
  {
    path: 'former',
    component: FormerPresidentsComponent,
  },
  {
    path: 'former-contact',
    component: FormerContactListComponent,
  },
  {
    path: 'lcpc',
    component: LcpcComponent,
  },
  {
    path: 'councilors',
    component: CouncilorsComponent,
  },
  {
    path: 'yg-g',
    component: YgGComponent,
  },
  {
    path: 'affiliated',
    component: AffiliatedProfessionalComponent,
  },
  {
    path: 'katalyst',
    component: KatalystComponent,
  },
  {
    path: 'impacts',
    component: ImpactsComponent,
  },
  {
    path: 'seed',
    component: SeedComponent,
  },
  {
    path: 'ukc',
    component: UkcComponent,
  },
  {
    path: 'ukc-call4paper',
    component: C4pComponent,
  },
  {
    path: 'ukc-review',
    component: ReviewComponent,
  },
  {
    path: 'step-up',
    component: StepUpComponent,
  },
  {
    path: 'nmsc',
    component: NmscComponent,
  },
  {
    path: 'ksea-letter',
    component: KseaLetterComponent,
  },
  {
    path: 'donation',
    component: DonationComponent,
  },
  {
    path: 'job',
    component: JobOpportunitiesComponent,
  },
  {
    path: 'job-view',
    component: JobOpportunitiesViewComponent,
  },
  {
    path: 'job-view1',
    component: JobView1Component,
  },
  {
    path: 'job-view2',
    component: JobView2Component,
  },
  {
    path: 'job-view3',
    component: JobView3Component,
  },
  {
    path: 'job-view4',
    component: JobView4Component,
  },
  {
    path: 'job-view5',
    component: JobView5Component,
  },
  {
    path: 'job-view6',
    component: JobView6Component,
  },
  {
    path: 'job-view7',
    component: JobView7Component,
  },
  {
    path: 'job-view8',
    component: JobView8Component,
  },
  {
    path: 'job-view9',
    component: JobView9Component,
  },
  {
    path: 'job-view10',
    component: JobView10Component,
  },
  {
    path: 'job-view11',
    component: JobView11Component,
  },
  {
    path: 'job-view12',
    component: JobView12Component,
  },
  {
    path: 'job-view13',
    component: JobView13Component,
  },
  {
    path: 'job-view14',
    component: JobView14Component,
  },
  {
    path: 'job-view15',
    component: JobView15Component,
  },
  {
    path: 'job-view16',
    component: JobView16Component,
  },
  {
    path: 'job-view17',
    component: JobView17Component,
  },
  {
    path: 'job-view18',
    component: JobView18Component,
  },
  {
    path: 'job-view19',
    component: JobView19Component,
  },
  {
    path: 'job-view20',
    component: JobView20Component,
  },
  {
    path: 'job-view21',
    component: JobView21Component,
  },
  {
    path: 'job-view22',
    component: JobView22Component,
  },
  {
    path: 'job-view23',
    component: JobView23Component,
  },
  {
    path: 'job-view24',
    component: JobView24Component,
  },
  {
    path: 'job-view25',
    component: JobView25Component,
  },
  {
    path: 'job-view25',
    component: JobView25Component,
  },
  {
    path: 'job-view26',
    component: JobView26Component,
  },
  {
    path: 'job-view27',
    component: JobView27Component,
  },
  {
    path: 'job-view28',
    component: JobView28Component,
  },
  {
    path: 'job-view29',
    component: JobView29Component,
  },
  {
    path: 'job-view30',
    component: JobView30Component,
  },
  {
    path: 'job-view31',
    component: JobView31Component,
  },
  {
    path: 'job-view32',
    component: JobView32Component,
  },
  {
    path: 'job-view33',
    component: JobView33Component,
  },
  {
    path: 'job-view34',
    component: JobView34Component,
  },
  {
    path: 'job-view35',
    component: JobView35Component,
  },
  {
    path: 'job-view36',
    component: JobView36Component,
  },
  {
    path: 'job-view37',
    component: JobView37Component,
  },
  {
    path: 'job-view38',
    component: JobView38Component,
  },
  {
    path: 'job-view39',
    component: JobView39Component,
  },
  {
    path: 'job-view40',
    component: JobView40Component,
  },
  {
    path: 'job-view41',
    component: JobView41Component,
  },
  {
    path: 'job-view42',
    component: JobView42Component,
  },
  {
    path: 'job-view43',
    component: JobView43Component,
  },
  {
    path: 'media',
    component: MediaComponent,
  },
  {
    path: 'media-view',
    component: MediaViewComponent,
  },
  {
    path: 'media-view1',
    component: MediaView1Component,
  },
  {
    path: 'media-view2',
    component: MediaView2Component,
  },
  {
    path: 'media-view3',
    component: MediaView3Component,
  },
  {
    path: 'media-view4',
    component: MediaView4Component,
  },
  {
    path: 'media-view5',
    component: MediaView5Component,
  },
  {
    path: 'media-view6',
    component: MediaView6Component,
  },
  {
    path: 'media-view7',
    component: MediaView7Component,
  },
  {
    path: 'media-view8',
    component: MediaView8Component,
  },
  {
    path: 'media-view9',
    component: MediaView9Component,
  },
  {
    path: 'media-view10',
    component: MediaView10Component,
  },
  {
    path: 'media-view11',
    component: MediaView11Component,
  },
  {
    path: 'media-view12',
    component: MediaView12Component,
  },
  {
    path: 'media-view13',
    component: MediaView13Component,
  },
  {
    path: 'media-view14',
    component: MediaView14Component,
  },
  {
    path: 'media-view15',
    component: MediaView15Component,
  },
  {
    path: 'media-view16',
    component: MediaView16Component,
  },
  {
    path: 'media-view17',
    component: MediaView17Component,
  },
  {
    path: 'media-view18',
    component: MediaView18Component,
  },
  {
    path: 'media-view19',
    component: MediaView19Component,
  },
  {
    path: 'media-view20',
    component: MediaView20Component,
  },
  {
    path: 'media-view21',
    component: MediaView21Component,
  },
  {
    path: 'media-view22',
    component: MediaView22Component,
  },
  {
    path: 'media-view23',
    component: MediaView23Component,
  },
  {
    path: 'media-view24',
    component: MediaView24Component,
  },
  {
    path: 'media-view25',
    component: MediaView25Component,
  },
  {
    path: 'media-view26',
    component: MediaView26Component,
  },
  {
    path: 'media-view27',
    component: MediaView27Component,
  },
  {
    path: 'media-view28',
    component: MediaView28Component,
  },
  {
    path: 'media-view29',
    component: MediaView29Component,
  },
  {
    path: 'media-view30',
    component: MediaView30Component,
  },
  {
    path: 'media-view31',
    component: MediaView31Component,
  },
  {
    path: 'media-view32',
    component: MediaView32Component,
  },
  {
    path: 'media-view33',
    component: MediaView33Component,
  },
  {
    path: 'media-view34',
    component: MediaView34Component,
  },
  {
    path: 'media-view35',
    component: MediaView35Component,
  },
  {
    path: 'media-view36',
    component: MediaView36Component,
  },
  {
    path: 'media-view37',
    component: MediaView37Component,
  },
  {
    path: 'media-view38',
    component: MediaView38Component,
  },
  {
    path: 'media-view39',
    component: MediaView39Component,
  },
  {
    path: 'media-view40',
    component: MediaView40Component,
  },
  {
    path: 'media-view41',
    component: MediaView41Component,
  },
  {
    path: 'media-view42',
    component: MediaView42Component,
  },
  {
    path: 'announcement',
    component: AnnouncementComponent,
  },
  {
    path: 'announcement-view1',
    component: AnnouncementView1Component,
  },
  {
    path: 'announcement-view2',
    component: AnnouncementView2Component,
  },
  {
    path: 'announcement-view3',
    component: AnnouncementView3Component,
  },
  {
    path: 'announcement-view4',
    component: AnnouncementView4Component,
  },
  {
    path: 'announcement-view5',
    component: AnnouncementView5Component,
  },
  {
    path: 'announcement-view6',
    component: AnnouncementView6Component,
  },
  {
    path: 'announcement-view7',
    component: AnnouncementView7Component,
  },
  {
    path: 'announcement-view8',
    component: AnnouncementView8Component,
  },
  {
    path: 'announcement-view9',
    component: AnnouncementView9Component,
  },
  {
    path: 'announcement-view10',
    component: AnnouncementView10Component,
  },
  {
    path: 'announcement-view11',
    component: AnnouncementView11Component,
  },
  {
    path: 'announcement-view12',
    component: AnnouncementView12Component,
  },
  {
    path: 'announcement-view13',
    component: AnnouncementView13Component,
  },
  {
    path: 'announcement-view14',
    component: AnnouncementView14Component,
  },
  {
    path: 'announcement-view15',
    component: AnnouncementView15Component,
  },
  {
    path: 'announcement-view16',
    component: AnnouncementView16Component,
  },
  {
    path: 'announcement-view17',
    component: AnnouncementView17Component,
  },
  {
    path: 'announcement-view18',
    component: AnnouncementView18Component,
  },
  {
    path: 'announcement-view19',
    component: AnnouncementView19Component,
  },
  {
    path: 'announcement-view20',
    component: AnnouncementView20Component,
  },
  {
    path: 'announcement-view21',
    component: AnnouncementView21Component,
  },
  {
    path: 'announcement-view22',
    component: AnnouncementView22Component,
  },
  {
    path: 'announcement-view23',
    component: AnnouncementView23Component,
  },
  {
    path: 'announcement-view24',
    component: AnnouncementView24Component,
  },
  {
    path: 'announcement-view25',
    component: AnnouncementView25Component,
  },
  {
    path: 'announcement-view26',
    component: AnnouncementView26Component,
  },
  {
    path: 'announcement-view27',
    component: AnnouncementView27Component,
  },
  {
    path: 'announcement-view28',
    component: AnnouncementView28Component,
  },
  {
    path: 'announcement-view29',
    component: AnnouncementView29Component,
  },
  {
    path: 'announcement-view30',
    component: AnnouncementView30Component,
  },
  {
    path: 'announcement-view31',
    component: AnnouncementView31Component,
  },
  {
    path: 'announcement-view32',
    component: AnnouncementView32Component,
  },
  {
    path: 'announcement-view33',
    component: AnnouncementView33Component,
  },
  {
    path: 'announcement-view34',
    component: AnnouncementView34Component,
  },
  {
    path: 'announcement-view35',
    component: AnnouncementView35Component,
  },
  {
    path: 'announcement-view36',
    component: AnnouncementView36Component,
  },
  {
    path: 'announcement-view37',
    component: AnnouncementView37Component,
  },
  {
    path: 'announcement-view38',
    component: AnnouncementView38Component,
  },
  {
    path: 'announcement-view39',
    component: AnnouncementView39Component,
  },
  {
    path: 'announcement-view40',
    component: AnnouncementView40Component,
  },
  {
    path: 'announcement-view41',
    component: AnnouncementView41Component,
  },
  {
    path: 'announcement-view42',
    component: AnnouncementView42Component,
  },
  {
    path: 'announcement-view43',
    component: AnnouncementView43Component,
  },
  {
    path: 'announcement-view44',
    component: AnnouncementView44Component,
  },
  {
    path: 'announcement-view45',
    component: AnnouncementView45Component,
  },
  {
    path: 'announcement-view46',
    component: AnnouncementView46Component,
  },
  {
    path: 'announcement-view47',
    component: AnnouncementView47Component,
  },
  {
    path: 'announcement-view48',
    component: AnnouncementView48Component,
  },
  {
    path: 'announcement-view49',
    component: AnnouncementView49Component,
  },
  {
    path: 'announcement-view50',
    component: AnnouncementView50Component,
  },
  {
    path: 'announcement-view51',
    component: AnnouncementView51Component,
  },
  {
    path: 'announcement-view52',
    component: AnnouncementView52Component,
  },
  {
    path: 'announcement-view53',
    component: AnnouncementView53Component,
  },
  {
    path: 'announcement-view54',
    component: AnnouncementView54Component,
  },
  {
    path: 'announcement-view55',
    component: AnnouncementView55Component,
  },
  {
    path: 'announcement-view56',
    component: AnnouncementView56Component,
  },
  {
    path: 'announcement-view57',
    component: AnnouncementView57Component,
  },
  {
    path: 'announcement-view57',
    component: AnnouncementView57Component,
  },
  {
    path: 'announcement-view57',
    component: AnnouncementView57Component,
  },
  {
    path: 'announcement-view57',
    component: AnnouncementView57Component,
  },
  {
    path: 'announcement-view57',
    component: AnnouncementView57Component,
  },
  {
    path: 'announcement-view57',
    component: AnnouncementView57Component,
  },
  {
    path: 'announcement-view57',
    component: AnnouncementView57Component,
  },
  {
    path: 'announcement-view57',
    component: AnnouncementView57Component,
  },
  {
    path: 'announcement-view58',
    component: AnnouncementView58Component,
  },
  {
    path: 'announcement-view59',
    component: AnnouncementView59Component,
  },
  {
    path: 'announcement-view60',
    component: AnnouncementView60Component,
  },
  {
    path: 'announcement-view61',
    component: AnnouncementView61Component,
  },
  {
    path: 'announcement-view62',
    component: AnnouncementView62Component,
  },
  {
    path: 'announcement-view63',
    component: AnnouncementView63Component,
  },
  {
    path: 'announcement-view64',
    component: AnnouncementView64Component,
  },
  {
    path: 'announcement-view65',
    component: AnnouncementView65Component,
  },
  {
    path: 'announcement-view66',
    component: AnnouncementView66Component,
  },
  {
    path: 'announcement-view67',
    component: AnnouncementView67Component,
  },
  {
    path: 'announcement-view68',
    component: AnnouncementView68Component,
  },
  {
    path: 'announcement-view69',
    component: AnnouncementView69Component,
  },
  {
    path: 'announcement-view70',
    component: AnnouncementView70Component,
  },
  {
    path: 'announcement-view71',
    component: AnnouncementView71Component,
  },
  {
    path: 'announcement-view72',
    component: AnnouncementView72Component,
  },
  {
    path: 'announcement-view73',
    component: AnnouncementView73Component,
  },
  {
    path: 'announcement-view74',
    component: AnnouncementView74Component,
  },
  {
    path: 'announcement-view75',
    component: AnnouncementView75Component,
  },
  {
    path: 'announcement-view76',
    component: AnnouncementView76Component,
  },
  {
    path: 'announcement-view77',
    component: AnnouncementView77Component,
  },
  {
    path: 'announcement-view78',
    component: AnnouncementView78Component,
  },
  {
    path: 'announcement-view79',
    component: AnnouncementView79Component,
  },
  {
    path: 'announcement-view80',
    component: AnnouncementView80Component,
  },
  {
    path: 'announcement-view81',
    component: AnnouncementView81Component,
  },
  {
    path: 'announcement-view82',
    component: AnnouncementView82Component,
  },
  {
    path: 'announcement-view83',
    component: AnnouncementView83Component,
  },
  {
    path: 'announcement-view84',
    component: AnnouncementView84Component,
  },
  {
    path: 'announcement-view85',
    component: AnnouncementView85Component,
  },
  {
    path: 'announcement-view86',
    component: AnnouncementView86Component,
  },
  {
    path: 'announcement-view87',
    component: AnnouncementView87Component,
  },
  {
    path: 'announcement-view88',
    component: AnnouncementView88Component,
  },
  {
    path: 'announcement-view89',
    component: AnnouncementView89Component,
  },
  {
    path: 'announcement-view90',
    component: AnnouncementView90Component,
  },
  {
    path: 'announcement-view91',
    component: AnnouncementView91Component,
  },
  {
    path: 'announcement-view92',
    component: AnnouncementView92Component,
  },
  {
    path: 'announcement-view93',
    component: AnnouncementView93Component,
  },
  {
    path: 'announcement-view94',
    component: AnnouncementView94Component,
  },
  {
    path: 'announcement-view95',
    component: AnnouncementView95Component,
  },
  {
    path: 'announcement-view96',
    component: AnnouncementView96Component,
  },
  {
    path: 'announcement-view97',
    component: AnnouncementView97Component,
  },
  {
    path: 'announcement-view98',
    component: AnnouncementView98Component,
  },
  {
    path: 'announcement-view99',
    component: AnnouncementView99Component,
  },

  {
    path: 'policies',
    component: PoliciesComponent,
  },
  {
    path: 'bylaws',
    component: BylawsComponent,
  },
  {
    path: 'conduct',
    component: CodeConductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
