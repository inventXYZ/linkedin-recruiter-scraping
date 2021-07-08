import fetch_search_results from "./Linkedin Recruiter functions.mjs"
import filter_search_results from "./Filtering functions.mjs"
import save_json_file from "./Filesystem functions.mjs"

const search_results = await fetch_search_results()

const filtered_search_results = filter_search_results(search_results)

save_json_file(filtered_search_results)