# Answers to customer questions

## Q1:

> Hello George,
> 
> Thank you for reaching out. Search engines can be very complex and are not something people talk about very often. Those are very good questions, and I'd love to help you learn the answers to them.
>
> Records and Indicies are core parts of the Algolia search engine. You can think of records as "what I want to search for." These are the actual items returned when you execute a search with Algolia. In practice records have many different attributes, and Algolia uses these to optimize the results when you search. 
>
> Indicies are entities, within Algolia, that hold many records. The Index is where you import all of your records, and when you search, you search "against" an index. The index is what tells the Algolia engine what attributes exist on the records it holds, and how to be able to most effectively search those records. The action of "indexing" takes place when you want to add, remove, update, or manipulate the records within an index. This can happen via the Algolia API or through the dashboard.
>
> I'd love to point you to some further reading. Feel free to check out the Algolia documentation, and do not hesitate to reach out if you have any more questions.
> 
> [What are records and indicies in Algolia?](https://www.algolia.com/doc/guides/getting-started/what-is-algolia/?language=javascript#vocabulary)
>
> Thanks,
>
> Lance Hasson


## Q2:

> Hello Matt,
>
> I'm sorry to hear that changes we have made have caused a problem with your workflow. The dashboard is meant to be a resource for you, and unfortunately a recent update we made has hindered that. I am thankful that you have taken the opportunity to let me know of this issue, and how it is affecting you.
>
> I am going to reach out to our user experience team and see if they are aware of this problem. In the meantime, I'd like to suggest an alternative solution, that may work for you going forward. Algolia offers several APIs for interacting with indicies programatically. If this is something you are comfortable with, please refer to the documentation I will link below for more information. Don't hesitate to reach out to me if you have any questions regarding how to write a script to use with these APIs.
>
> Please expect to hear back from me by the end of the day tomorrow with an update from our user experience team. I am hopeful that we will be able to find a way to help you clear and delete indicies in the new dashboard.
> 
> [Programmatically manage indicies](https://www.algolia.com/doc/api-client/manage-indices/)
>
> Thanks,
>
> Lance Hasson


## Q3:

> Hello Leo,
>
> Thank you for your interest in Algolia! I'm excited to hear that you are considering us for your website. The short answer is no: Algolia is quick to set up, and there are many tools to help with that process.
>
> The high level process of onboarding with Algolia looks like this. First, you will need to decide what you want to search. This could be existing data or some new services that you want to be searchable. Once you have made that decision, we can investigate your data and see if it is fit to be indexed. This means identifying attributes that you think will be useful for the search results you want to see and creating them, if they don't exist already. 
>
> Now we're ready to import some data. We can do this through the Algolia dashboard, or if you have an existing web service, we can programatically import the data from there using Algolia's APIs. Don't worry about if the API will work with your web server of choice. We have clients for ten of the major programming languages that you are likely to be using.
>
> Once we've got the data into your index (or indicies), we're ready to start searching! Again using Algolia's API clients we can implement search capability on your website on the front-end using Javascript, or from the back-end like we did with the data imports. 
>
> This entire process can often take less than a day of work. During the process, I'll be here for you to consult and to help you with any questions you might have. I'll also be able to point you towards many of the tools and examples that already exist, and help you create a great search experience on your website through Algolia.
>
> Don't hesitate to reach out if you have any more questions, or if you would like to see a demo of what Algolia can look like on your website.
>
> Thanks,
>
> Lance Hasson