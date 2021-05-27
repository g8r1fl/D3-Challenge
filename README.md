# D3-Challenge

## Goal:
In this project we are given a csv with some data from the __US Census Bureau__ and the __Behavioural Risk Factor Survelillance System(BRFSS)__.  The data points are various health risk factors and demographic metrics.  The task is to analyze the current trends shaping people's lives, as well as creating charts, graphs and interactive elements to help readers understand the findings.

### Basic requirement
Using HTML, Javascript and D3 I need to first create a basic scatter plot comparing two variables such as __Healthcare vs Poverty__  or __Smokers vs Age__.

![scatter](D3_data_journalism/images/4-scatter.jpg)

### Advanced Requirement
The advanced version of this project was to add additional axes on x & y and make them interactive for the user to choose which metrics they wanted to compare.  This also included adding tooltips and the state abbreviation in each circle.

![animated scatter plot](D3_data_journalism/images/7-animated-scatter.gif)

### Challenges
I was able to code the basic requirement and the advanced with the exception of the tooltips and state abbreviations.

The basic scatter plot wasn't difficult especially using a previous activity as a template and customizing it for this task.  Adding the additional x axes wasn't terribly difficult either.  The main challenge came in adding the additional 2 y axes regarding the positioning of them as well as re-rendering the circles with new yAxis.  

## Final Analysis:
### Poverty vs Obesity, Smoker & lack of healthcare
By looking at the chart there is definitely a correlation between poverty and the three health risk factors.  For each health risk factor vs poverty, we see a trend increasing in percentage of obese, smokers and lack of healthcare as you move towards the higher percentiles of poverty levels.  
The inverse is seen when you compare the same three health risk factors vs Median Household Income(MHI).  As the (MHI) increases, each of the three health risk factors decrease.  

### Age vs Obesity, Smoker & lack of healthcare
The data doesn't seem to show any correlation between __*age*__ and __*lacks healthcare*__ althought, the majority of the sample are between the ages of 34-44.

There does seem to show a slight correlation to smoking.  As age increases, there percentage of smokers seems to incrrease.

Finally, there doesn't seem to be any correlation between _**age**_ and _**obesity**_.

