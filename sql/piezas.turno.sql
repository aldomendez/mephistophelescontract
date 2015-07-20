SELECT  Sum(min1)sft1, Sum(min2)sft2, Sum(min3)sft3 FROM
(
  SELECT
    welder_id,
    device,                                         
    To_Char(test_dt - INTERVAL '6:30' HOUR TO MINUTE, 'DD') fecha,

    CASE WHEN To_Char(test_dt,'hh24mi') BETWEEN 0630 AND 1500 THEN 1 ELSE 0 END min1,
    CASE WHEN To_Char(test_dt,'hh24mi') BETWEEN 1500 AND 2300 THEN 1 ELSE 0  END min2,
    CASE WHEN To_Char(test_dt,'hh24mi') >=2300 THEN 1
      WHEN To_Char(test_dt,'hh24mi') <=0629 THEN 1 ELSE 0 END Min3


  FROM dare_pkg.FIBER_WELD_PROD
  WHERE welder_id IN ('AOI5','AOI11','AOI1','AOI21','AOI6')
  AND SubStr(product,3,1) IN ('2','5')
  AND state = 'C'
  AND test_dt BETWEEN To_Date(':nowDay/:nowMonth/2015 0630','dd/mm/yyyy hh24mi') 
  AND                 To_Date(':tomDay/:tomMonth/2015 0630','dd/mm/yyyy hh24mi')

)  
UNION ALL
SELECT  Count(DISTINCT min1) sft1, Count( DISTINCT min2 ) sft2, Count( DISTINCT min3 )sft3 FROM
(
  SELECT 
  CASE WHEN To_Char(test_dt,'hh24mi') BETWEEN 0630 AND 1500 THEN welder_id ELSE null END min1,
  CASE WHEN To_Char(test_dt,'hh24mi') BETWEEN 1500 AND 2300 THEN Welder_id ELSE null  END min2,
  CASE WHEN To_Char(test_dt,'hh24mi') >=2300 THEN welder_id
    WHEN To_Char(test_dt,'hh24mi') <=0629 THEN welder_id ELSE null END Min3 
  FROM dare_pkg.FIBER_WELD_PROD
  WHERE welder_id IN ('AOI5','AOI11','AOI1','AOI21','AOI6')
  AND SubStr(product,3,1) IN ('2','5')
  AND state = 'C'
  AND test_dt BETWEEN To_Date(':nowDay/:nowMonth/2015 0630','dd/mm/yyyy hh24mi') 
  AND                 To_Date(':tomDay/:tomMonth/2015 0630','dd/mm/yyyy hh24mi')
)
