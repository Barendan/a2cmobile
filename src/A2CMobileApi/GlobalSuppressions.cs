// This file is used by Code Analysis to maintain SuppressMessage
// attributes that are applied to this project.
// Project-level suppressions either have no target or are given
// a specific target and scoped to a namespace, type, member, etc.

using System.Diagnostics.CodeAnalysis;

[assembly: SuppressMessage("Design", "RCS1090:Call 'ConfigureAwait(false)'.", Scope = "module",
    Justification = "'ConfigureAwait(false)' should not be used when the context is needed after the 'await', such as building 'an ASP.NET response, including return statements in controller actions.' Stephen Cleary https://bit.ly/3ce0Pya")]
[assembly: SuppressMessage("Reliability", "CA2007:Consider calling ConfigureAwait on the awaited task", Scope = "module",
    Justification = "'ConfigureAwait(false)' should not be used when the context is needed after the 'await', such as building 'an ASP.NET response, including return statements in controller actions.' Stephen Cleary https://bit.ly/3ce0Pya")]
[assembly: SuppressMessage("Globalization", "CA1305:Specify IFormatProvider", Scope = "module",
    Justification = "DefaultThreadCurrentCulture is set to InvariantCulture in Global.asax Application_Start")]
