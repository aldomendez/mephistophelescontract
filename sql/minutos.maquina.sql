SELECT welder_id,fecha,  Sum(total_min) total_min, Count(device) piezas, Sum(min1)sft1, Sum(min2)sft2, Sum(min3)sft3 FROM
(
  SELECT
    welder_id,
    device,
    Round(1 + (end_dt-test_dt) *24 * 60 ) total_min,
    To_Char(test_dt - INTERVAL '6:30' HOUR TO MINUTE, 'DD') fecha,
--    CASE
--      WHEN To_Char(test_dt,'hh24mi') BETWEEN 0630 AND 1500 THEN 1
--      WHEN To_Char(test_dt,'hh24mi') BETWEEN 1500 AND 2300 THEN 2
--      WHEN To_Char(test_dt,'hh24mi') >=2300 THEN 3
--      WHEN To_Char(test_dt,'hh24mi') <=0630 THEN 3
--    ELSE 0
--    END shift,
    CASE WHEN To_Char(test_dt,'hh24mi') BETWEEN 0630 AND 1500 THEN Round((end_dt-test_dt) *24 * 60 ) ELSE 0 END min1,
    CASE WHEN To_Char(test_dt,'hh24mi') BETWEEN 1500 AND 2300 THEN Round((end_dt-test_dt) *24 * 60 ) ELSE 0  END min2,
    CASE WHEN To_Char(test_dt,'hh24mi') >=2300 THEN Round((end_dt-test_dt) *24 * 60 )
      WHEN To_Char(test_dt,'hh24mi') <=0630 THEN Round((end_dt-test_dt) *24 * 60 ) ELSE 0 END Min3


  FROM dare_pkg.FIBER_WELD_PROD
  WHERE welder_id IN ('AOI5','AOI11','AOI1','AOI21')
  AND test_dt BETWEEN To_Date('9/6/2015 0630','dd/mm/yyyy hh24mi') AND To_Date('10/6/2015 0630','dd/mm/yyyy hh24mi')

) GROUP BY welder_id, fecha
  ORDER BY welder_id, fecha
