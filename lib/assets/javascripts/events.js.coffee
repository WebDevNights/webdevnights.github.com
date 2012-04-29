$(document).bind "impress:stepenter",(step) =>
  return unless step
  target = step.target.id
  console.log(target)
  if($(step.target).hasClass("dark") || target == "demo" || target == "nights")
    $('body').addClass('code')
  if($(step.target).hasClass("light") || target == "first" || target == "thatsit")
    $('body').removeClass('code')

