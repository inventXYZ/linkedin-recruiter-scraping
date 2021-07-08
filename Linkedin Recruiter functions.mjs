import fetch from "node-fetch"

async function get_search_results(number_of_desired_results = 250, number_of_results_per_page = 25) {

    const number_of_pages_we_need_to_fetch = Math.ceil(number_of_desired_results / number_of_results_per_page)

    let search_results = []
    for (let current_page = 0; current_page < number_of_pages_we_need_to_fetch; current_page += 1) {
        try {
            // grab data from a page in the linkedin search
            // save the data
            let linkedin_recruiter_page_url = `https://www.linkedin.com/recruiter/api/smartsearch?searchHistoryId=9470112314&searchCacheKey=2b9e4900-423d-4681-86d7-4a438170a5ae%2CI7uC&searchRequestId=4369a0d8-0351-4523-bc5f-ab32fa8ad4dd%2C6tkF&searchSessionId=9470112314&linkContext=Controller%3AsmartSearch%2CAction%3Asearch%2CID%3A9470112314&doExplain=false&origin=GHDS&start=${current_page * number_of_results_per_page}`
            let response_from_page = await fetch(linkedin_recruiter_page_url, {
                "headers": {
                    "accept": "application/json, text/javascript, */*; q=0.01",
                    "accept-language": "en-US,en;q=0.9",
                    "sec-ch-ua": "\"Microsoft Edge\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-li-page-instance": "urn:li:page:cap-fe-desktop-smart-search;j71rhGSjRyWNgtgfBNzqBQ==",
                    "x-requested-with": "XMLHttpRequest",
                    "cookie": "bcookie=v=2&2969f3b5-5e2c-4b51-8584-93c5a31e9865; bscookie=v=1&20200103214837c3104e64-659d-40a7-831c-d735d7335567AQEbB8vWCUkhDCO_K_74Mwlm1tfX-Fx1; VID=V_2020_08_26_04_877; sl=\"v=1&2zPQ0\"; li_sugr=b9b697a3-32bb-49fe-8851-238c1df3cdc1; gpv_pn=www.linkedin.com%2Fbusiness%2Flearning%2Fblog%2Fproductivity-tips%2Fshare-a-google-doc-with-a-non-google-user; s_tslv=1611071326381; lissc=1; JSESSIONID=\"ajax:3417837331636019478\"; timezone=America/New_York; li_rm=AQHL6wK3suV2pgAAAXiJC53_F-mupziefKB_8L0cyo4jELkIND9S5cqsJpD6hI7vY2cFjHP2bbxHlQKlmwoMI-mwslhgCVEBecbwvHlm90aV-6WLYXpVy2nX; visit=\"v=1&M\"; G_ENABLED_IDPS=google; liap=true; _ga=GA1.2.460147569.1620893872; _guid=88a0da87-9905-4326-b15d-e61bde81e327; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18774%7CMCMID%7C90358182047063176340989065261671433761%7CMCOPTOUT-1622053313s%7CNONE%7CvVersion%7C5.1.1; u_tz=GMT-04:00; spectroscopyId=854e3138-434d-460d-8cae-c5dcfe2019ad; UserMatchHistory=AQJFxwnQWOsevgAAAXp4ysogl3f2ZS6u9MT5nO4d9aPZQmRQYbObqgT3x3NZhDZgrTz_ziRxcejpZrdQxnqz4Lw9x0XuxpxYPmlYDCzKGENqkyyR4HKIoOvu1LiRF0mQ1rQSCoMuk27Fi4CkVqc30tQ7SHDh7HwS5k74QX1wSHF9D1GNYIc1hzoEU5d8M73C6FKEVPdZBwYfpodyWbSCJcjsPKUC1hfCQBuQ1D5EgV3ndqpyK3FGjQ-2Y6H9jJ_OSNrUfUsEnqu72egtJtsPDM5NZD-zZxfheRWtiscqmlIQZgED_7ymdG0XDMclmnGQ7UtRX_ePq917WtpiQb0CENIVlBlp6g; lidc=\"b=TB41:s=T:r=T:a=T:p=T:g=3396:u=304:i=1625708846:t=1625771029:v=2:sig=AQG3uawuF4EOYRY0LpR1i_iodHBlq6cD\"; li_at=AQEDAR_emCkFr0ccAAABeoPMfEYAAAF6p9kARk4ATzwpoCHmVazlWfvUu6opuchMrxhn_wiODeZ5xzIIDF-Oz0zFDl8J-QVzJH0EM-X2c2fReTC07KGYUHoVbGp8HqG_onEogxb0Q9LC-_wb629obT_c; li_a=AQJ2PTEmY2FwX3NlYXQ9MjMwODQ0MzE2JmNhcF9hZG1pbj10cnVlJmNhcF9rbj0zNDczNTY3ODbmhehTjMAC7xaDfWdxtR6x945IOw; cap_session_id=3549921696:1; li_er=v=1&r=urn:li:contract:347356786&t=1624005887046&g=MDIxbxIbWBVPH9jGLBIXvUhnG9rT0Za1G7k5wwHyhxvP9Bw=; PLAY_LANG=en; lang=v=2&lang=en-US; sdsc=34%3A1%2C1625708915336%7ECAOR%2C0%7ECAST%2C-38919u2aM3DPkgjeo25lti%2BbtQh3LWDk%3D; PLAY_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InNlc3Npb25faWQiOiJhZWY0NDhiNC1hNmMzLTRjYzEtYWEyZC1jYzBiYzZjZWQ1ZTZ8MTYyNTcwODg4MCIsInJlY2VudGx5LXNlYXJjaGVkIjoiIiwicmVmZXJyYWwtdXJsIjoiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2NhcC9kYXNoYm9hcmQvaG9tZSIsIlJOVC1pZCI6InwwIiwicmVjZW50bHktdmlld2VkIjoiIiwiQ1BULWlkIjoiw5JmJlxybTF5ZcKbS3Upw4xwQ2YiLCJleHBlcmllbmNlIjoiIiwid2hpdGVsaXN0Ijoie1wiQnVzaW5lc3MgU2VnbWVudDpTdHJhdGVnaWNcIjpcImZhbHNlXCJ9IiwidHJrIjoiIn0sIm5iZiI6MTYyNTcwOTcxNiwiaWF0IjoxNjI1NzA5NzE2fQ._rll1uuvld_-Q7VLO_VykUlmDPoug_64gnAtvjEPib4"
                },
                "referrer": linkedin_recruiter_page_url,
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET",
                "mode": "cors"
            })
            let search_results_json = await response_from_page.json()
            let actual_search_results_info = search_results_json["result"]["searchResults"]

            // add this page's results to our big running list
            search_results.push(...actual_search_results_info)
        } catch (error) {
            // do nothing :/
        }
    }

    return search_results
}

export default get_search_results