# Tasks after publishing a new release of GOV.UK Frontend

Once we've published a new release of GOV.UK Frontend there are a number of things we still need to do, such as informing our community and updating our own repos.

## Update our repos to use the new release

Developers should update [city-design-system](https://github.com/alphagov/city-design-system) and [city-frontend-docs](https://github.com/alphagov/city-frontend-docs) to use the new release. When updating the design system, you should also test any new or updated guidance that relate to the new release and publish them along with the version update.

## Let the community know about the new release

We now need to update our comms channels.

### The mailing list

The team should send out an email with the release comms drafted before publishing.

The release email should:

- give a summary of the update
- explain on why teams should update
- components or styles affected (if possible)
- thanks to any major contributors (if possible, include name and organisation)

A release email will typically end with a link to the version's [release notes](https://github.com/alphagov/city-frontend/releases), and a call-to-action button to the [update npm how-to page](https://frontend.design-system.service.gov.uk/updating-with-npm/#update-using-node-js-package-manager-npm).

For example, see the [release email for GOV.UK Frontend 4.4.0](https://us1.admin.mailchimp.com/campaigns/show?id=10053738).

### Slack

We should update both internal and x-gov slack channels:

- [GDS: city-design-system](https://gds.slack.com/archives/CAF8JA25U)
- [GDS: digital-service-platforms](https://gds.slack.com/archives/C01E20X06JK)
- [x-gov: city-design-system](https://ukgovernmentdigital.slack.com/archives/C6DMEH5R6)

The message we send on Slack is usually a shorter version of the email.

### Design System website

We should check if we need to update the following places on the website:

- the "what's new" section on the homepage of the website. The content for this section can be found in [/views/partials/\_whats-new.njk](https://github.com/alphagov/city-design-system/blob/main/views/partials/_whats-new.njk).
- the aliases section in the metadata of the [Upcoming components and patterns page](https://github.com/alphagov/city-design-system/blob/main/src/community/upcoming-components-patterns/index.md?plain=1) to ensure that if a release includes a new component that searches for that component on the website no longer point at that page

## Clear the decks

Finally, we should make sure that our issue list and sprint board are tidy by making sure:

- issues created for this release are all complete, closed, and moved into the **Done** column on the [Design System cycle board](https://github.com/orgs/alphagov/projects/53)
- that all the issues (on the same board) solved and/or published in this release have been moved from the **Ready to Release** column to **Done**
- any associated milestones are closed
